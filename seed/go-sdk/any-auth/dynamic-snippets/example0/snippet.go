package example

import (
    client "github.com/any-auth/rapiddocs/client"
    option "github.com/any-auth/rapiddocs/option"
    context "context"
    rapiddocs "github.com/any-auth/rapiddocs"
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
    client.Auth.GetToken(
        context.TODO(),
        &rapiddocs.GetTokenRequest{
            ClientId: "client_id",
            ClientSecret: "client_secret",
            Scope: rapiddocs.String(
                "scope",
            ),
        },
    )
}
