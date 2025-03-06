package example

import (
    client "github.com/custom-auth/rapiddocs/client"
    option "github.com/custom-auth/rapiddocs/option"
    context "context"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
        option.WithCustomAuthScheme(
            "<value>",
        ),
    )
    client.CustomAuth.GetWithCustomAuth(
        context.TODO(),
    )
}
