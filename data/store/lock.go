// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

// default locker is for cross-process locking via a file
// Freehold is only single process and the lock file actually
// seems to be causing issues with concurrent requests to create
// datastores
// The freehold locker does nothing instead

// TODO: The default locker may be used if I can find a satisfactory method
// of handling simulaneous requests to create or delete the same datastore
// Possible options:
//	Marked for Deletion - Mark a datastore for deletion instead of
//		deleting right away, return a failure to anyone trying
//		to read or write a datastore marked for deletion
//	Drop Timeout - Set datastore deletion on a timeout
//		and if any reads or writes are made on a datastore
//		that has been set to be dropped, then cancel the
//		drop request and leave the datastore as is.

// I don't like either option.  The first gives worse concurrency
// than we currently have with the lockfiles
// The second is unexpected behahvior. "I dropped this datastore, why
// is it still around?"
// In the end this scenario of creating and dropping the same datastore on
// concurrent threads doesn't seem to be a realistic scenario outside of
// the Unit Tests, as only a DS owner can create or drop a DS.
// However if you have multiple applications, all running as you
// with separate tokens, that want to create or drop the same DS
// They may run into an issue.  So currently I'm sticking with no lock file for now.

package store

import "io"

func freeholdLocker(dbname string) (io.Closer, error) {
	return &lockCloser{}, nil
}

type lockCloser struct {
}

func (lc *lockCloser) Close() error {
	return nil
}
