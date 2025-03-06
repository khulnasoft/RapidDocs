package example

import (
    client "github.com/nullable/rapiddocs/client"
    option "github.com/nullable/rapiddocs/option"
    context "context"
    rapiddocs "github.com/nullable/rapiddocs"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Nullable.GetUsers(
        context.TODO(),
        &rapiddocs.GetUsersRequest{
            Usernames: []*string{
                rapiddocs.String(
                    "usernames",
                ),
            },
            Avatar: rapiddocs.String(
                "avatar",
            ),
            Activated: []*bool{
                rapiddocs.Bool(
                    true,
                ),
            },
            Tags: []*string{
                rapiddocs.String(
                    "tags",
                ),
            },
            Extra: rapiddocs.Bool(
                true,
            ),
        },
    )
}
