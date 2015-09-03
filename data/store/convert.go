// Copyright 2015 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

// +build !windows,!nacl,!plan9

package store

import (
	"bytes"
	"errors"
	"fmt"
	"io"
	"os"
	"path/filepath"

	"github.com/boltdb/bolt"
	"github.com/cznic/kv"
)

// convert converts from the old datastore type (cznic/kv) to the new one (boltdb)
func convert(filename string) error {
	kvFile := convertedFile(filename)
	if fileExists(kvFile) {
		return fmt.Errorf("Old convered datastore file already exists, Datastore %s is already converted!", kvFile)
	}
	err := os.Rename(filename, kvFile)
	if err != nil {
		return err
	}

	kvStore, err := kv.Open(kvFile, &kv.Options{
		VerifyDbBeforeOpen:  true,
		VerifyDbAfterOpen:   true,
		VerifyDbBeforeClose: true,
		VerifyDbAfterClose:  true})

	if err != nil {
		revertFiles(filename)
		return err
	}
	defer kvStore.Close()

	boltStore, err := bolt.Open(filename, 0666, nil)

	boltStore.StrictMode = true
	if err != nil {
		revertFiles(filename)
		return err
	}
	defer boltStore.Close()

	enum, err := kvStore.SeekFirst()
	if err != nil {
		revertFiles(filename)
		return err
	}

	err = boltStore.Update(func(tx *bolt.Tx) error {
		bucket, err := tx.CreateBucketIfNotExists([]byte(filename))
		if err != nil {
			revertFiles(filename)
			return err
		}
		for {
			k, v, err := enum.Next()
			if err == io.EOF {
				break
			}
			if err != nil {
				revertFiles(filename)
				return err
			}

			err = bucket.Put(k, v)
			if err != nil {
				revertFiles(filename)
				return err
			}
		}
		return nil
	})
	if err != nil {
		revertFiles(filename)
		return err
	}

	err = boltStore.View(func(tx *bolt.Tx) error {
		kvIter, err := kvStore.SeekFirst()
		if err != nil {
			revertFiles(filename)
			return err
		}

		boltIter := tx.Bucket([]byte(filename)).Cursor()

		var bk, bv, kk, kv []byte
		bk, bv = boltIter.First()

		for {
			kk, kv, err = kvIter.Next()
			if err == io.EOF {
				if bk != nil {
					revertFiles(filename)
					return errors.New("KV finished iterating before bolt")
				}
				break
			}
			if err != nil {
				revertFiles(filename)
				return err
			}

			if bk == nil {
				revertFiles(filename)
				return errors.New("Bolt finished iterating before kv")
			}

			if bytes.Compare(kk, bk) != 0 {
				revertFiles(filename)
				return fmt.Errorf("Bolt and KV Keys don't match KV: %s, Bolt: %s", kk, bk)
			}
			if bytes.Compare(kv, bv) != 0 {
				revertFiles(filename)
				return fmt.Errorf("Bolt and KV values don't match KV: %s, Bolt: %s", kv, bv)
			}

			bk, bv = boltIter.Next()

		}
		return nil
	})
	if err != nil {
		revertFiles(filename)
		return err
	}
	return nil
}

func fileExists(filename string) bool {
	if _, err := os.Stat(filename); err == nil {
		return true
	}
	return false
}

func convertedFile(filename string) string {
	return filepath.Join(filepath.Dir(filename), "."+filepath.Base(filename)+".converted")

}

func revertFiles(filename string) {
	converted := convertedFile(filename)

	if !fileExists(converted) {
		return
	}

	if fileExists(filename) {
		os.Remove(filename)
	}

	os.Rename(converted, filename)

}
