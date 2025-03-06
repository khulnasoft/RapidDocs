package example

import (
    client "github.com/version-no-default/rapiddocs/client"
    option "github.com/version-no-default/rapiddocs/option"
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
