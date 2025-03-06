package main

import (
	"encoding/json"
	"testing"
	"time"

	"github.com/khulnasoft/rapiddocs-go/internal/cmd/cmdtest"
	packages "github.com/khulnasoft/rapiddocs-go/internal/testdata/sdk/packages/fixtures"
	post "github.com/khulnasoft/rapiddocs-go/internal/testdata/sdk/post-with-path-params/fixtures"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

const (
	commandName       = "rapiddocs-go-sdk"
	configFilename    = "config.json"
	testdataPath      = "../../internal/testdata/sdk"
	fixturesDirectory = "fixtures"
)

func TestFixtures(t *testing.T) {
  t.Skip("These tests require running in a Docker container with /bin/go-v2 installed")
	cmdtest.TestFixtures(t, commandName, testdataPath, usage, run)
}

func TestStringifyJSON(t *testing.T) {
	valueWithUnrecognized := new(packages.Foo)
	require.NoError(t, json.Unmarshal([]byte(`{"id":"42","name":"rapiddocs","extra":"unrecognized"}`), valueWithUnrecognized))
	assert.Equal(
		t,
		`{
  "id": "42",
  "name": "rapiddocs",
  "extra": "unrecognized"
}`,
		valueWithUnrecognized.String(),
	)

	valueWithoutUnrecognized := new(packages.Foo)
	require.NoError(t, json.Unmarshal([]byte(`{"id":"42","name":"rapiddocs"}`), valueWithoutUnrecognized))
	assert.Equal(
		t,
		`{
  "id": "42",
  "name": "rapiddocs"
}`,
		valueWithoutUnrecognized.String(),
	)
}

func TestTime(t *testing.T) {
	date := time.Date(1994, time.March, 16, 0, 0, 0, 0, time.UTC)

	t.Run("required", func(t *testing.T) {
		empty := &post.SetNameRequest{}

		emptyBytes, err := json.Marshal(empty)
		require.NoError(t, err)
		assert.Equal(t, `{"userName":"","date":"0001-01-01","datetime":"0001-01-01T00:00:00Z"}`, string(emptyBytes))

		value := &post.SetNameRequest{
			UserName: "rapiddocs",
			Date:     date,
			Datetime: date,
		}

		bytes, err := json.Marshal(value)
		require.NoError(t, err)
		assert.Equal(t, `{"userName":"rapiddocs","date":"1994-03-16","datetime":"1994-03-16T00:00:00Z"}`, string(bytes))
	})
}
