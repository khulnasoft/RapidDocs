package example

import (
    client "github.com/path-parameters/rapiddocs/client"
    option "github.com/path-parameters/rapiddocs/option"
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
        "tenant_id",
        "user_id",
    )
}
