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
    client.Users.ListWithCursorPagination(
        context.TODO(),
        &rapiddocs.ListUsersCursorPaginationRequest{
            Page: rapiddocs.Int(
                1.1,
            ),
            PerPage: rapiddocs.Int(
                1.1,
            ),
            Order: rapiddocs.OrderAsc.Ptr(),
            StartingAfter: rapiddocs.String(
                "starting_after",
            ),
        },
    )
}
