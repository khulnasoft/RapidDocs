// This file was auto-generated by Rapiddocs from our API Definition.

package completions

import (
	context "context"
	rapiddocs "github.com/server-sent-events/rapiddocs"
	core "github.com/server-sent-events/rapiddocs/core"
	internal "github.com/server-sent-events/rapiddocs/internal"
	option "github.com/server-sent-events/rapiddocs/option"
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

func (c *Client) Stream(
	ctx context.Context,
	request *rapiddocs.StreamCompletionRequest,
	opts ...option.RequestOption,
) (*core.Stream[rapiddocs.StreamedCompletion], error) {
	options := core.NewRequestOptions(opts...)
	baseURL := internal.ResolveBaseURL(
		options.BaseURL,
		c.baseURL,
		"",
	)
	endpointURL := baseURL + "/stream"
	headers := internal.MergeHeaders(
		c.header.Clone(),
		options.ToHeader(),
	)
	headers.Set("Accept", "text/event-stream")

	streamer := internal.NewStreamer[rapiddocs.StreamedCompletion](c.caller)
	return streamer.Stream(
		ctx,
		&internal.StreamParams{
			URL:             endpointURL,
			Method:          http.MethodPost,
			Headers:         headers,
			Prefix:          internal.DefaultSSEDataPrefix,
			Terminator:      "[[DONE]]",
			MaxAttempts:     options.MaxAttempts,
			BodyProperties:  options.BodyProperties,
			QueryParameters: options.QueryParameters,
			Client:          options.HTTPClient,
			Request:         request,
		},
	)
}
