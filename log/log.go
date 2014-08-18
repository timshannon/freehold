// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package log

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"log/syslog"
	"time"

	"bitbucket.org/tshannon/freehold/data"
	"bitbucket.org/tshannon/freehold/data/store"
	"bitbucket.org/tshannon/freehold/fail"
	"bitbucket.org/tshannon/freehold/setting"
)

const DS = "core/log.ds"

type Log struct {
	When string `json:"when"`
	Type string `json:"type"`
	Log  string `json:"log"`
}

type Iter struct {
	Type  string           `json:"type,omitempty"`
	From  *json.RawMessage `json:"from,omitempty"`
	To    *json.RawMessage `json:"to,omitempty"`
	Skip  int              `json:"skip,omitempty"`
	Limit int              `json:"limit,omitempty"`
	Order string           `json:"order,omitempty"`
}

func NewEntry(Type string, entry string) {
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		syslogError(errors.New("Error can't log entry to freehold instance. Entry: " +
			entry + " error: " + err.Error()))
		return

	}
	when := time.Now().Format(time.RFC3339)

	log := &Log{
		When: when,
		Type: Type,
		Log:  entry,
	}

	err = ds.Put(when, log)
	if err != nil {
		syslogError(errors.New("Error can't log entry to freehold instance. Entry: " +
			entry + " error: " + err.Error()))
		return
	}
}

func Get(iter *Iter) ([]*Log, error) {
	//FIXME:
	ds, err := data.OpenCoreDS(DS)
	if err != nil {
		return nil, err
	}

	if iter.Order != "asc" && iter.Order != "dsc" && iter.Order != "" {
		return nil, fail.New("Invalid Order specified", iter)
	}

	var from []byte
	var to []byte

	if iter.From != nil {
		from = []byte(*iter.From)
	} else {
		from, err = ds.Min()
		if err != nil {
			return nil, err
		}
	}
	if iter.To != nil {
		to = []byte(*iter.To)
	} else {
		to, err = ds.Max()
		if err != nil {
			return nil, err
		}

	}

	if iter.Order != "" {
		if iter.Order != "asc" && iter.Order != "dsc" {
			return nil, fail.New("Invalid Order specified", iter)
		}
		//Flip from and to if order is specified.  If order isn't specified, then iteration direction
		// is implied
		if (iter.Order == "dsc" && store.Compare(from, to) != 1) ||
			(iter.Order == "asc" && store.Compare(to, from) == -1) {
			from, to = to, from
		}
	}

	i, err := ds.Iter(from, to)
	if err != nil {
		return nil, err
	}

	skip := 0
	limit := 0
	result := make([]*Log, 0, iter.Limit)

	for i.Next() {
		if iter.Limit > 0 && iter.Limit <= limit {
			break
		}
		if i.Err() != nil {
			return nil, i.Err()
		}
		value := i.Value()
		if value == nil {
			//shouldn't happen
			panic("Nil value returned from datastore iterator")
		}

		entry := &Log{}
		err = json.Unmarshal(value, entry)
		if err != nil {
			return nil, err
		}

		if iter.Type != "" && entry.Type != iter.Type {
			continue
		}

		skip++
		if iter.Skip > 0 && iter.Skip >= skip {
			continue
		}

		result = append(result, entry)

		limit++
	}

	return result, nil
}

// Error logs and error to the core log datastore.  For core code the rule for error logging
// is to not log it until it's "bubbled up to the top".  Meaning only the http handler
// should log the error.  This is to prevent the same error from being logged a bunch of times.
func Error(err error) {
	if !setting.Bool("LogErrors") {
		return
	}
	if setting.Bool("LogErrorsToSyslog") {
		syslogError(err)
	}
	//TODO: Remove
	fmt.Println("Error: ", err)
	NewEntry("error", err.Error())
}

func Fail(err error) {
	if !setting.Bool("LogFailures") {
		return
	}
	NewEntry("failure", err.Error())
}

func syslogError(err error) {
	lWriter, err := syslog.New(syslog.LOG_ERR, "freehold")
	if err != nil {
		log.Fatal("Error writing to syslog: %v", err)
	}
	lWriter.Err(err.Error())
}
