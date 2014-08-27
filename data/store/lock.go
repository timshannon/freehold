// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

// Same as default KV locker, except with a randmized lockfile name
// resolves an issue where multiple go routines create and delete
// a ds file with the same name.  It shouldn't conflict, because
// the RW mux should prevent it, but occasionally I get lock file
// exists errors.  This clears it up.

package store

import (
	"crypto/rand"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"sync"
)

func lockname(filename string) string {
	base := filepath.Base(filepath.Clean(filename))

	result := make([]byte, 4)
	_, err := io.ReadFull(rand.Reader, result)
	if err != nil {
		panic(fmt.Sprintf("Error generating random values: %v", err))
	}

	return filepath.Join(filepath.Dir(filename), fmt.Sprintf(".%x.%s", result, base))
}

func freeholdLocker(dbname string) (io.Closer, error) {
	lname := lockname(dbname)
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
