// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package ratelimit

import (
	"encoding/json"
	"errors"
	"math"
	"os"
	"time"

	"bitbucket.org/tshannon/freehold/data"
	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/setting"
)

//DS is the path to the ratelimit core ds file
const DS = "core" + string(os.PathSeparator) + "ratelimit.ds"
const baseRange = 1 * time.Minute

// FailExceedLimit is the type of error thrown when a rate limit has been reached
var ErrExceededLimit = errors.New("Maximum request limit has been reached. Please try again later.")

type requestAttempt struct {
	IPAddress string    `json:"ipAddress,omitempty"`
	When      time.Time `json:"when,omitempty"`
	Type      string    `json:"type,omitempty"`

	limit float64 `json:"-"`
}

func (r *requestAttempt) key() string {
	return r.Type + "_" + r.IPAddress + "_" + r.When.Format(time.RFC3339Nano)
}

// AttemptRequest logs an an attempt request of the passed in type for the passed in IP address
// Will return ErrExceededLimit if the  passed in limit per minute is reached
// It is a combination of InsertAttempt and OverLimit
func AttemptRequest(ipAddress string, requestType string, limit float64) error {
	err := InsertAttempt(ipAddress, requestType, limit)
	if err != nil {
		return err
	}
	return OverLimit(ipAddress, requestType, limit)
}

// InsertAttempt will insert a new request attempt into the datastore
func InsertAttempt(ipAddress string, requestType string, limit float64) error {
	if limit <= 0 {
		return nil
	}
	attempt := &requestAttempt{
		IPAddress: ipAddress,
		When:      time.Now(),
		Type:      requestType,
		limit:     limit,
	}

	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return err
	}

	return ds.Put(attempt.key(), attempt)
}

// OverLimit tests if the ipAddress is over the passed in limit for the given request type
func OverLimit(ipAddress string, requestType string, limit float64) error {
	pAttempt, err := previousAttempts(ipAddress, requestType)
	if err != nil {
		return err
	}

	//If limit is fractional, then the timerange is expand to encompass limit * 1 minute
	// so if more than one entry is found within that expanded range, then they are over
	// the fraction limit
	if (limit >= 1 && float64(len(pAttempt)) > limit) ||
		(limit < 1 && len(pAttempt) > 1) {
		if setting.Float("RateLimitWait") > 0 {
			time.Sleep(time.Duration(setting.Float("RateLimitWait")) * time.Second)
		}

		return fail.NewFromErr(ErrExceededLimit, &requestAttempt{
			IPAddress: ipAddress,
			When:      time.Now(),
			Type:      requestType,
			limit:     limit,
		})
	}

	return nil
}

// ResetLimit resets the number of requests for a request type and IP address
func ResetLimit(ipAddress string, requestType string) error {
	attempts, err := previousAttempts(ipAddress, requestType)
	if err != nil {
		return err
	}

	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return err
	}

	for i := range attempts {
		err = ds.Delete(attempts[i].key())
		if err != nil {
			return err
		}
	}

	return nil
}

func previousAttempts(ipAddress string, requestType string) ([]*requestAttempt, error) {
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}

	base := &requestAttempt{
		IPAddress: ipAddress,
		Type:      requestType,
		When:      time.Time{},
	}

	from, err := json.Marshal(base.key())
	if err != nil {
		return nil, err
	}

	base.When = time.Now().AddDate(100, 0, 0)

	to, err := json.Marshal(base.key())
	if err != nil {
		return nil, err
	}

	iter, err := ds.Iter(from, to)
	if err != nil {
		iter.Close()
		return nil, err
	}

	var attempts []*requestAttempt
	var cleared []*requestAttempt

	for iter.Next() {
		a := &requestAttempt{}
		if iter.Err() != nil {
			iter.Close()
			return nil, iter.Err()
		}

		err = json.Unmarshal(iter.Value(), a)
		if err != nil {
			iter.Close()
			return nil, err
		}

		if a.cleared() {
			cleared = append(cleared, a)
			continue
		}

		attempts = append(attempts, a)
	}
	err = iter.Close()
	if err != nil {
		return nil, err
	}

	for i := range cleared {
		err = ds.Delete(cleared[i].key())
		if err != nil {
			return nil, err
		}
	}

	return attempts, nil
}

func (r *requestAttempt) cleared() bool {
	return r.When.Before(time.Now().Add((timeRange(r.limit) * -1)))
}

func timeRange(limit float64) time.Duration {
	if limit < 0 {
		//expand the search range to allow for decimal rate limits
		// i.e. .5 attempts per minute would be 1 attempt every 2 minutes
		return time.Duration(float64(baseRange) * math.Abs(limit))
	}
	return baseRange
}
