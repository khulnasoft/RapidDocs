// This file was auto-generated by Rapiddocs from our API Definition.

package client

import (
	completions "github.com/server-sent-event-examples/rapiddocs/completions"
	core "github.com/server-sent-event-examples/rapiddocs/core"
	internal "github.com/server-sent-event-examples/rapiddocs/internal"
	option "github.com/server-sent-event-examples/rapiddocs/option"
	http "net/http"
)

type Client struct {
	baseURL string
	caller  *internal.Caller
	header  http.Header

	Completions *completions.Client
}

func NewClient(opts ...option.RequestOption) *Client {
	options := core.NewRequestOptions(opts...)
	return &Client{
		baseURL: options.BaseURL,
		caller: internal.NewCaller(
			&internal.CallerParams{
				Client:      options.HTTPClient,
				MaxAttempts: options.MaxAttempts,
			},
		),
		header:      options.ToHeader(),
		Completions: completions.NewClient(opts...),
	}
}
