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
    client.Dataservice.Fetch(
        context.TODO(),
        &rapiddocs.FetchRequest{
            Ids: []*string{
                rapiddocs.String(
                    "ids",
                ),
            },
            Namespace: rapiddocs.String(
                "namespace",
            ),
        },
    )
}
