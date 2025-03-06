package example

import (
    client "github.com/grpc-proto-exhaustive/rapiddocs/client"
    option "github.com/grpc-proto-exhaustive/rapiddocs/option"
    context "context"
    rapiddocs "github.com/grpc-proto-exhaustive/rapiddocs"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Dataservice.List(
        context.TODO(),
        &rapiddocs.ListRequest{
            Prefix: rapiddocs.String(
                "prefix",
            ),
            Limit: rapiddocs.Int(
                1,
            ),
            PaginationToken: rapiddocs.String(
                "paginationToken",
            ),
            Namespace: rapiddocs.String(
                "namespace",
            ),
        },
    )
}
