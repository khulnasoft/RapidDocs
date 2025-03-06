package example

import (
    client "github.com/bearer-token-environment-variable/rapiddocs/client"
    option "github.com/bearer-token-environment-variable/rapiddocs/option"
    context "context"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
        option.WithApiKey(
            "<token>",
        ),
    )
    client.Service.GetWithBearerToken(
        context.TODO(),
    )
}
