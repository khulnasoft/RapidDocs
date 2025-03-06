package example

import (
    client "github.com/oauth-client-credentials-nested-root/rapiddocs/client"
    option "github.com/oauth-client-credentials-nested-root/rapiddocs/option"
    context "context"
    auth "github.com/oauth-client-credentials-nested-root/rapiddocs/auth"
    rapiddocs "github.com/oauth-client-credentials-nested-root/rapiddocs"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Auth.GetToken(
        context.TODO(),
        &auth.GetTokenRequest{
            ClientId: "client_id",
            ClientSecret: "client_secret",
            Scope: rapiddocs.String(
                "scope",
            ),
        },
    )
}
