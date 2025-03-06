package example

import (
    client "github.com/oauth-client-credentials-custom/rapiddocs/client"
    option "github.com/oauth-client-credentials-custom/rapiddocs/option"
    context "context"
    rapiddocs "github.com/oauth-client-credentials-custom/rapiddocs"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Auth.GetTokenWithClientCredentials(
        context.TODO(),
        &rapiddocs.GetTokenRequest{
            Cid: "cid",
            Csr: "csr",
            Scp: "scp",
            EntityId: "entity_id",
            Scope: rapiddocs.String(
                "scope",
            ),
        },
    )
}
