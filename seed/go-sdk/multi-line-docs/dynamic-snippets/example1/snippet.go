package example

import (
    client "github.com/multi-line-docs/rapiddocs/client"
    option "github.com/multi-line-docs/rapiddocs/option"
    context "context"
    rapiddocs "github.com/multi-line-docs/rapiddocs"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.User.CreateUser(
        context.TODO(),
        &rapiddocs.CreateUserRequest{
            Name: "name",
            Age: rapiddocs.Int(
                1,
            ),
        },
    )
}
