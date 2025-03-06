package example

import (
    client "github.com/auth-environment-variables/rapiddocs/client"
    option "github.com/auth-environment-variables/rapiddocs/option"
    context "context"
    rapiddocs "github.com/auth-environment-variables/rapiddocs"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
        option.WithApiKey(
            "<value>",
        ),
    )
    client.Service.GetWithHeader(
        context.TODO(),
        &rapiddocs.HeaderAuthRequest{
            XEndpointHeader: "X-Endpoint-Header",
        },
    )
}
