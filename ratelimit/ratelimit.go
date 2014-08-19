// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package ratelimit

import (
	"encoding/json"
	"errors"
	"math"
	"time"

	"bitbucket.org/tshannon/freehold/data"
	"bitbucket.org/tshannon/freehold/fail"
)

const (
	DS        = "core/ratelimit.ds"
	baseRange = 1 * time.Minute
)

var FailExceededLimit = errors.New("Maximum request limit has been reached. Please try again later.")

type requestAttempt struct {
	IpAddress string    `json:"ipAddress,omitempty"`
	When      time.Time `json:"when,omitempty"`
	Type      string    `json:"type,omitempty"`

	limit float64 `json:"-"`
}

func (r *requestAttempt) key() string {
	return r.Type + "_" + r.IpAddress + "_" + r.When.Format(time.RFC3339)
}

func AttemptRequest(ipAddress string, requestType string, limit float64) error {
	if limit <= 0 {
		return nil
	}
	attempt := &requestAttempt{
		IpAddress: ipAddress,
		When:      time.Now(),
		Type:      requestType,
		limit:     limit,
	}

	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return err
	}

	err = ds.Put(attempt.key(), attempt)
	if err != nil {
		return err
	}

	pAttempt, err := previousAttempts(ipAddress, requestType)
	if err != nil {
		return err
	}

	//If limit is fractional, then the timerange is expand to encompas limit * 1 minute
	// so if more than one entry is found within that expanded range, then they are over
	// the fraction limit
	if (limit >= 1 && float64(len(pAttempt)) > attempt.limit) ||
		(limit < 1 && len(pAttempt) > 1) {
		return fail.NewFromErr(FailExceededLimit, attempt)
	}

	return nil

}

func previousAttempts(ipAddress string, requestType string) ([]*requestAttempt, error) {
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}

	base := &requestAttempt{
		IpAddress: ipAddress,
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
		return nil, err
	}

	var attempts []*requestAttempt

	for iter.Next() {
		a := &requestAttempt{}
		if iter.Err() != nil {
			return nil, iter.Err()
		}

		err = json.Unmarshal(iter.Value(), a)
		if err != nil {
			return nil, err
		}

		if a.cleared() {
			err = ds.Delete(iter.Key())
			if err != nil {
				return nil, err
			}
			continue
		}

		attempts = append(attempts, a)
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
