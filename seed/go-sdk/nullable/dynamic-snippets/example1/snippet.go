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
    client.Nullable.CreateUser(
        context.TODO(),
        &rapiddocs.CreateUserRequest{
            Username: "username",
            Tags: []string{
                "tags",
                "tags",
            },
            Metadata: &rapiddocs.Metadata{
                CreatedAt: rapiddocs.MustParseDateTime(
                    "2024-01-15T09:30:00Z",
                ),
                UpdatedAt: rapiddocs.MustParseDateTime(
                    "2024-01-15T09:30:00Z",
                ),
                Avatar: rapiddocs.String(
                    "avatar",
                ),
                Activated: rapiddocs.Bool(
                    true,
                ),
            },
            Avatar: rapiddocs.String(
                "avatar",
            ),
        },
    )
}
