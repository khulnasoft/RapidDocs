package example

import (
    client "github.com/basic-auth-environment-variables/rapiddocs/client"
    option "github.com/basic-auth-environment-variables/rapiddocs/option"
    context "context"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
        option.WithBasicAuth(
            "<username>",
            "<password>",
        ),
    )
    client.BasicAuth.GetWithBasicAuth(
        context.TODO(),
    )
}
