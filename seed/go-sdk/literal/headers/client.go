// This file was auto-generated by Rapiddocs from our API Definition.

package headers

import (
	context "context"
	fmt "fmt"
	rapiddocs "github.com/literal/rapiddocs"
	core "github.com/literal/rapiddocs/core"
	internal "github.com/literal/rapiddocs/internal"
	option "github.com/literal/rapiddocs/option"
	http "net/http"
)

type Client struct {
	baseURL string
	caller  *internal.Caller
	header  http.Header
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
	}
}

func (c *Client) Send(
	ctx context.Context,
	request *rapiddocs.SendLiteralsInHeadersRequest,
	opts ...option.RequestOption,
) (*rapiddocs.SendResponse, error) {
	options := core.NewRequestOptions(opts...)
	baseURL := internal.ResolveBaseURL(
		options.BaseURL,
		c.baseURL,
		"",
	)
	endpointURL := baseURL + "/headers"
	headers := internal.MergeHeaders(
		c.header.Clone(),
		options.ToHeader(),
	)
	headers.Add("X-Endpoint-Version", fmt.Sprintf("%v", "02-12-2024"))
	headers.Add("X-Async", fmt.Sprintf("%v", true))

	var response *rapiddocs.SendResponse
	if err := c.caller.Call(
		ctx,
		&internal.CallParams{
			URL:             endpointURL,
			Method:          http.MethodPost,
			Headers:         headers,
			MaxAttempts:     options.MaxAttempts,
			BodyProperties:  options.BodyProperties,
			QueryParameters: options.QueryParameters,
			Client:          options.HTTPClient,
			Request:         request,
			Response:        &response,
		},
	); err != nil {
		return nil, err
	}
	return response, nil
}
