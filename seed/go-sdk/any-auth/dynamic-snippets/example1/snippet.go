package example

import (
    client "github.com/any-auth/rapiddocs/client"
    option "github.com/any-auth/rapiddocs/option"
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
    client.User.Get(
        context.TODO(),
    )
}
