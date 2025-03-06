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
    client.Complex.Search(
        context.TODO(),
        &rapiddocs.SearchRequest{
            Pagination: &rapiddocs.StartingAfterPaging{
                PerPage: 1,
                StartingAfter: rapiddocs.String(
                    "starting_after",
                ),
            },
            Query: &rapiddocs.SearchRequestQuery{
                SingleFilterSearchRequest: &rapiddocs.SingleFilterSearchRequest{
                    Field: rapiddocs.String(
                        "field",
                    ),
                    Operator: rapiddocs.SingleFilterSearchRequestOperatorEquals.Ptr(),
                    Value: rapiddocs.String(
                        "value",
                    ),
                },
            },
        },
    )
}
