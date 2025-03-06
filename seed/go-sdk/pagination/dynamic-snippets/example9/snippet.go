package example

import (
    client "github.com/pagination/rapiddocs/client"
    option "github.com/pagination/rapiddocs/option"
    context "context"
    rapiddocs "github.com/pagination/rapiddocs"
    uuid "github.com/google/uuid"
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
    client.Users.ListWithExtendedResults(
        context.TODO(),
        &rapiddocs.ListUsersExtendedRequest{
            Cursor: rapiddocs.UUID(
                uuid.MustParse(
                    "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32",
                ),
            ),
        },
    )
}
