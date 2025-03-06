package example

import (
    client "github.com/oauth-client-credentials/rapiddocs/client"
    option "github.com/oauth-client-credentials/rapiddocs/option"
    context "context"
    rapiddocs "github.com/oauth-client-credentials/rapiddocs"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Auth.RefreshToken(
        context.TODO(),
        &rapiddocs.RefreshTokenRequest{
            ClientId: "client_id",
            ClientSecret: "client_secret",
            RefreshToken: "refresh_token",
            Scope: rapiddocs.String(
                "scope",
            ),
        },
    )
}
