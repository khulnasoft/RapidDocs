package example

import (
    client "github.com/literal/rapiddocs/client"
    option "github.com/literal/rapiddocs/option"
    context "context"
    rapiddocs "github.com/literal/rapiddocs"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Query.Send(
        context.TODO(),
        &rapiddocs.SendLiteralsInQueryRequest{
            Query: "What is the weather today",
        },
    )
}
