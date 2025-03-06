package example

import (
    client "github.com/version/rapiddocs/client"
    option "github.com/version/rapiddocs/option"
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
