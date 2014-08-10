// from http://golang.org/src/pkg/crypto/tls/generate_cert.go and modified
// Copyright 2009 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file (http://golang.org/LICENSE).

// Generate a self-signed X.509 certificate for a TLS server. Outputs to
// 'cert.pem' and 'key.pem' and will overwrite existing files.

package cert

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"crypto/x509/pkix"
	"encoding/pem"
	"errors"
	"math"
	"math/big"
	"net"
	"os"
	"strings"
	"time"
)

//var (
//host      = flag.String("host", "", "Comma-separated hostnames and IPs to generate a certificate for")
//validFrom = flag.String("start-date", "", "Creation date formatted as Jan 1 15:04:05 2011")
//validFor  = flag.Duration("duration", 365*24*time.Hour, "Duration that certificate is valid for")
//isCA      = flag.Bool("ca", false, "whether this cert should be its own Certificate Authority")
//rsaBits   = flag.Int("rsa-bits", 2048, "Size of RSA key to generate")
//)
func GenerateCert(host, organization string, validFrom time.Time, validFor time.Duration, isCA bool, rsaBits int,
	certFile string, keyFile string) error {

	if certFile == "" {
		certFile = "cert.pem"
	}
	if keyFile == "" {
		keyFile = "key.pem"
	}

	if len(host) == 0 {
		return errors.New("Host must be specified")
	}

	priv, err := rsa.GenerateKey(rand.Reader, rsaBits)
	if err != nil {
		return errors.New("failed to generate private key: " + err.Error())
	}

	var notBefore time.Time = validFrom

	notAfter := notBefore.Add(validFor)

	// end of ASN.1 time
	endOfTime := time.Date(2049, 12, 31, 23, 59, 59, 0, time.UTC)
	if notAfter.After(endOfTime) {
		notAfter = endOfTime
	}
	serialNumber, err := rand.Int(rand.Reader, big.NewInt(math.MaxInt64))
	if err != nil {
		return err
	}
	template := x509.Certificate{
		//SerialNumber: new(big.Int).SetInt64(0), // replace with random serial number
		SerialNumber: serialNumber,
		Subject: pkix.Name{
			Organization: []string{organization},
		},
		NotBefore: notBefore,
		NotAfter:  notAfter,

		KeyUsage:              x509.KeyUsageKeyEncipherment | x509.KeyUsageDigitalSignature,
		ExtKeyUsage:           []x509.ExtKeyUsage{x509.ExtKeyUsageServerAuth},
		BasicConstraintsValid: true,
	}

	hosts := strings.Split(host, ",")
	for _, h := range hosts {
		if ip := net.ParseIP(h); ip != nil {
			template.IPAddresses = append(template.IPAddresses, ip)
		} else {
			template.DNSNames = append(template.DNSNames, h)
		}
	}

	if isCA {
		template.IsCA = true
		template.KeyUsage |= x509.KeyUsageCertSign
	}

	derBytes, err := x509.CreateCertificate(rand.Reader, &template, &template, &priv.PublicKey, priv)
	if err != nil {
		return errors.New("Failed to create certificate: " + err.Error())
	}

	certOut, err := os.Create(certFile)
	if err != nil {
		return errors.New("failed to open cert.pem for writing: " + err.Error())
	}
	pem.Encode(certOut, &pem.Block{Type: "CERTIFICATE", Bytes: derBytes})
	certOut.Close()

	keyOut, err := os.OpenFile(keyFile, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0600)
	if err != nil {
		return errors.New("failed to open key.pem for writing: " + err.Error())
	}
	pem.Encode(keyOut, &pem.Block{Type: "RSA PRIVATE KEY", Bytes: x509.MarshalPKCS1PrivateKey(priv)})
	keyOut.Close()
	return nil
}
