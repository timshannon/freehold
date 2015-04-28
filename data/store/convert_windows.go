package store

// convert converts from the old datastore type (cznic/kv) to the new one (boltdb)
func convert(filename string) error {
	//Alright, I get that this looks a little strange, but unfortunately there is a
	// duplicate symbol reference error between go-commonmark and cznic/kv
	// see https://github.com/golang/go/issues/8756
	// Since I've moved away from cznic, and only reference it for this conversion process
	// and since there couldn't have been any previous windows build before now
	// I am not building a windows specific conversion from cznic/kv files
	// as there should be no need.  I can drop this file though
	// sometime around go1.5 when they fix the issue above.
	// If you find this note, thanks for taking an interest in freehold :)
	return nil
}
