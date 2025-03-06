package example

import (
    client "github.com/examples/rapiddocs/client"
    option "github.com/examples/rapiddocs/option"
    context "context"
    rapiddocs "github.com/examples/rapiddocs"
)

func do() () {
    client := client.NewAcme(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
        option.WithToken(
            "<token>",
        ),
    )
    client.Service.GetMetadata(
        context.TODO(),
        &rapiddocs.GetMetadataRequest{
            Shallow: rapiddocs.Bool(
                false,
            ),
            Tag: []*string{
                rapiddocs.String(
                    "development",
                ),
            },
            XApiVersion: "0.0.1",
        },
    )
}
