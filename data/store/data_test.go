package store

import (
	"bytes"
	"encoding/json"
	"math/rand"
	"testing"

	"github.com/cznic/kv"
)

func BenchmarkOriginalSort(b *testing.B) {
	err := CreateNormal("test.ds")
	if err != nil {
		b.Error(err)
	}
	err = InserData(b)

	Delete("test.ds")
	if err != nil {
		b.Error(err)
	}

}

func BenchmarkNaturalSort(b *testing.B) {
	err := Create("test.ds")
	if err != nil {
		b.Error(err)
	}
	err = InserData(b)

	Delete("test.ds")
	if err != nil {
		b.Error(err)
	}

}

func InserData(b *testing.B) error {
	data := []byte("data doesn't really matter, just the key compare")
	ds, err := Open("test.ds")
	if err != nil {
		return err
	}

	b.ResetTimer()
	for i := 0; i < 1000; i++ {
		key := rand.Float32()

		kb, err := json.Marshal(key)
		if err != nil {
			return err
		}
		err = ds.Put(kb, data)
		if err != nil {
			return err
		}

	}
	return nil
}

// Create creates a new store file
func CreateNormal(name string) error {
	option := options()
	option.Compare = bytes.Compare
	db, err := kv.Create(name, option)
	if err != nil {
		return err
	}
	return db.Close()
}
