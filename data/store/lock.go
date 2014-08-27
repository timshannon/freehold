// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

// Nearly identical to https://github.com/cznic/kv/blob/master/lock.go
// except freehold will manage the lockfilename with a unique identifier
// so that multiple attempts to create the same database won't have
// operlapping lock files

package store

import (
	"crypto/sha1"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"sync"
)

func lockName(dbname string) string {
	base := filepath.Base(filepath.Clean(dbname)) + "lockfile"
	h := sha1.New()
	io.WriteString(h, base)
	return filepath.Join(filepath.Dir(dbname), fmt.Sprintf(".%x", h.Sum(nil)))
}

func freeholdLocker(dbname string) (io.Closer, error) {
	lname := lockName(dbname)
	abs, err := filepath.Abs(lname)
	if err != nil {
		return nil, err
	}
	f, err := os.OpenFile(abs, os.O_CREATE|os.O_EXCL|os.O_RDONLY, 0666)
	if os.IsExist(err) {
		return nil, fmt.Errorf("cannot access DB %q: lock file %q exists", dbname, abs)
	}
	if err != nil {
		return nil, err
	}
	return &lockCloser{f: f, abs: abs}, nil
}

type lockCloser struct {
	f    *os.File
	abs  string
	once sync.Once
	err  error
}

func (lc *lockCloser) Close() error {
	lc.once.Do(lc.close)
	return lc.err
}

func (lc *lockCloser) close() {
	if err := lc.f.Close(); err != nil {
		lc.err = err
	}
	if err := os.Remove(lc.abs); err != nil {
		lc.err = err
	}
}
