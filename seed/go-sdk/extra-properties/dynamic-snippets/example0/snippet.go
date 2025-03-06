package example

import (
    client "github.com/extra-properties/rapiddocs/client"
    option "github.com/extra-properties/rapiddocs/option"
    context "context"
    rapiddocs "github.com/extra-properties/rapiddocs"
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
        },
    )
}
