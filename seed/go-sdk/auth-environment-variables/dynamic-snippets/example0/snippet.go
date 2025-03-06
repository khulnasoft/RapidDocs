package example

import (
    client "github.com/auth-environment-variables/rapiddocs/client"
    option "github.com/auth-environment-variables/rapiddocs/option"
    context "context"
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
    client.Service.GetWithApiKey(
        context.TODO(),
    )
}
