// This file was auto-generated by Rapiddocs from our API Definition.

package client

import (
	core "github.com/response-property/rapiddocs/core"
	internal "github.com/response-property/rapiddocs/internal"
	option "github.com/response-property/rapiddocs/option"
	service "github.com/response-property/rapiddocs/service"
	http "net/http"
)

type Client struct {
	baseURL string
	caller  *internal.Caller
	header  http.Header

	Service *service.Client
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
		header:  options.ToHeader(),
		Service: service.NewClient(opts...),
	}
}
