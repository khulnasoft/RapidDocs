// This file was auto-generated by Rapiddocs from our API Definition.

package client

import (
	core "github.com/cross-package-type-names/rapiddocs/core"
	folderaclient "github.com/cross-package-type-names/rapiddocs/foldera/client"
	folderdclient "github.com/cross-package-type-names/rapiddocs/folderd/client"
	foo "github.com/cross-package-type-names/rapiddocs/foo"
	internal "github.com/cross-package-type-names/rapiddocs/internal"
	option "github.com/cross-package-type-names/rapiddocs/option"
	http "net/http"
)

type Client struct {
	baseURL string
	caller  *internal.Caller
	header  http.Header

	FolderA *folderaclient.Client
	FolderD *folderdclient.Client
	Foo     *foo.Client
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
		FolderA: folderaclient.NewClient(opts...),
		FolderD: folderdclient.NewClient(opts...),
		Foo:     foo.NewClient(opts...),
	}
}
