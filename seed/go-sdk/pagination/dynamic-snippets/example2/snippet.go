package example

import (
    client "github.com/pagination/rapiddocs/client"
    option "github.com/pagination/rapiddocs/option"
    context "context"
    rapiddocs "github.com/pagination/rapiddocs"
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
    client.Users.ListWithMixedTypeCursorPagination(
        context.TODO(),
        &rapiddocs.ListUsersMixedTypeCursorPaginationRequest{
            Cursor: rapiddocs.String(
                "cursor",
            ),
        },
    )
}
