package example

import (
    client "github.com/path-parameters/rapiddocs/client"
    option "github.com/path-parameters/rapiddocs/option"
    context "context"
    rapiddocs "github.com/path-parameters/rapiddocs"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.User.UpdateUser(
        context.TODO(),
        "tenant_id",
        "user_id",
        &rapiddocs.UpdateUserRequest{
            Body: &rapiddocs.User{
                Name: "name",
                Tags: []string{
                    "tags",
                    "tags",
                },
            },
        },
    )
}
