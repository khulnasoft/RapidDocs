package example

import (
    client "github.com/oauth-client-credentials-default/rapiddocs/client"
    option "github.com/oauth-client-credentials-default/rapiddocs/option"
    context "context"
    rapiddocs "github.com/oauth-client-credentials-default/rapiddocs"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Auth.GetToken(
        context.TODO(),
        &rapiddocs.GetTokenRequest{
            ClientId: "client_id",
            ClientSecret: "client_secret",
        },
    )
}
