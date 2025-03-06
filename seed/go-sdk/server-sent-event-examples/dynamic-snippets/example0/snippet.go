package example

import (
    client "github.com/server-sent-event-examples/rapiddocs/client"
    option "github.com/server-sent-event-examples/rapiddocs/option"
    context "context"
    rapiddocs "github.com/server-sent-event-examples/rapiddocs"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Completions.Stream(
        context.TODO(),
        &rapiddocs.StreamCompletionRequest{
            Query: "foo",
        },
    )
}
