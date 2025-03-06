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
    client.Inlined.Send(
        context.TODO(),
        &rapiddocs.SendLiteralsInlinedRequest{
            Temperature: rapiddocs.Float64(
                10.1,
            ),
            ObjectWithLiteral: &rapiddocs.ATopLevelLiteral{
                NestedLiteral: &rapiddocs.ANestedLiteral{},
            },
            Query: "What is the weather today",
        },
    )
}
