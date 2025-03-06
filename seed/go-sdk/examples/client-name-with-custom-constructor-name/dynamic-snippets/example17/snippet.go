package example

import (
    client "github.com/examples/rapiddocs/client"
    option "github.com/examples/rapiddocs/option"
    context "context"
    rapiddocs "github.com/examples/rapiddocs"
)

func do() () {
    client := client.New(
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
                true,
            ),
            Tag: []*string{
                rapiddocs.String(
                    "tag",
                ),
            },
            XApiVersion: "X-API-Version",
        },
    )
}
