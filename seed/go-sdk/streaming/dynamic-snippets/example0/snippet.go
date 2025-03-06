package example

import (
    client "github.com/khulnasoft/stream-go/v2/client"
    option "github.com/khulnasoft/stream-go/v2/option"
    context "context"
    v2 "github.com/khulnasoft/stream-go/v2"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Dummy.GenerateStream(
        context.TODO(),
        &v2.GenerateStreamRequest{
            NumEvents: 1,
        },
    )
}
