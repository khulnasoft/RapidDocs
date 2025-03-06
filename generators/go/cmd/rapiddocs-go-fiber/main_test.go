package main

import (
	"testing"

	"github.com/khulnasoft/rapiddocs-go/internal/cmd/cmdtest"
)

const (
	commandName       = "rapiddocs-go-fiber"
	configFilename    = "config.json"
	testdataPath      = "../../internal/testdata/fiber"
	fixturesDirectory = "fixtures"
)

func TestFixtures(t *testing.T) {
  t.Skip("These tests require running in a Docker container with /bin/go-v2 installed")
	cmdtest.TestFixtures(t, commandName, testdataPath, usage, run)
}
