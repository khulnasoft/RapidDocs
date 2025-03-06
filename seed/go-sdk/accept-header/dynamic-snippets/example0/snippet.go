package example

import (
    client "github.com/accept-header/rapiddocs/client"
    option "github.com/accept-header/rapiddocs/option"
    context "context"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
        option.WithToken(
            "<token>",
        ),
    )
    client.Service.Endpoint(
        context.TODO(),
    )
}
