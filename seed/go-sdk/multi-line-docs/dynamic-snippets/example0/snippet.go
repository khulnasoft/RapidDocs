package example

import (
    client "github.com/multi-line-docs/rapiddocs/client"
    option "github.com/multi-line-docs/rapiddocs/option"
    context "context"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.User.GetUser(
        context.TODO(),
        "userId",
    )
}
