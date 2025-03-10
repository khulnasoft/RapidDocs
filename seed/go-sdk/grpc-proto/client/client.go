// This file was auto-generated by Rapiddocs from our API Definition.

package client

import (
	core "github.com/grpc-proto/rapiddocs/core"
	internal "github.com/grpc-proto/rapiddocs/internal"
	option "github.com/grpc-proto/rapiddocs/option"
	userservice "github.com/grpc-proto/rapiddocs/userservice"
	http "net/http"
)

type Client struct {
	baseURL string
	caller  *internal.Caller
	header  http.Header

	Userservice *userservice.Client
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
		Userservice: userservice.NewClient(opts...),
	}
}
