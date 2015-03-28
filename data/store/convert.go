// Copyright 2015 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

package store

import (
	"io"
	"os"

	"github.com/boltdb/bolt"
	"github.com/cznic/kv"
)

// convert converts from the old datastore type (cznic/kv) to the new one (boltdb)
func convert(filename string) error {
	kvFile := filename + ".convert"
	err := os.Rename(filename, kvFile)
	if err != nil {
		return err
	}

	kvStore, err := kv.Open(kvFile, &kv.Options{
		VerifyDbBeforeOpen:  true,
		VerifyDbAfterOpen:   true,
		VerifyDbBeforeClose: true,
		VerifyDbAfterClose:  true})
	defer kvStore.Close()
	if err != nil {
		return err
	}

	boltStore, err := bolt.Open(filename, 0666, nil)
	defer boltStore.Close()
	if err != nil {
		return err
	}

	enum, err := kvStore.SeekFirst()
	if err != nil {
		return err
	}

	err = boltStore.Update(func(tx *bolt.Tx) error {
		bucket, err := tx.CreateBucketIfNotExists([]byte(filename))
		if err != nil {
			return err
		}
		for {
			k, v, err := enum.Next()
			if err == io.EOF {
				break
			}
			if err != nil {
				return err
			}
			err = bucket.Put(k, v)
			if err != nil {
				return err
			}
		}
		return nil
	})

	return err
}
