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
    client.Dataservice.Upload(
        context.TODO(),
        &rapiddocs.UploadRequest{
            Columns: []*rapiddocs.Column{
                &rapiddocs.Column{
                    Id: "id",
                    Values: []float64{
                        1.1,
                    },
                },
            },
        },
    )
}
