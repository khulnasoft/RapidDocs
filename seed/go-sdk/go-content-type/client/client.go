// This file was auto-generated by Rapiddocs from our API Definition.

package client

import (
	core "github.com/go-content-type/rapiddocs/core"
	imdb "github.com/go-content-type/rapiddocs/imdb"
	internal "github.com/go-content-type/rapiddocs/internal"
	option "github.com/go-content-type/rapiddocs/option"
	http "net/http"
)

type Client struct {
	baseURL string
	caller  *internal.Caller
	header  http.Header

	Imdb *imdb.Client
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
		header: options.ToHeader(),
		Imdb:   imdb.NewClient(opts...),
	}
}
