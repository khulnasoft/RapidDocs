package example

import (
    client "github.com/server-sent-events/rapiddocs/client"
    option "github.com/server-sent-events/rapiddocs/option"
    context "context"
    rapiddocs "github.com/server-sent-events/rapiddocs"
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
            Query: "query",
        },
    )
}
