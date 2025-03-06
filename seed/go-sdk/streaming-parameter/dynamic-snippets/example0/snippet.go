package example

import (
    client "github.com/streaming-parameter/rapiddocs/client"
    context "context"
    rapiddocs "github.com/streaming-parameter/rapiddocs"
)

func do() () {
    client := client.NewClient()
    client.Dummy.Generate(
        context.TODO(),
        &rapiddocs.GenerateRequest{
            Stream: false,
            NumEvents: 5,
        },
    )
}
