package example

import (
    client "github.com/khulnasoft/undiscriminated-go/client"
    option "github.com/khulnasoft/undiscriminated-go/option"
    context "context"
    undiscriminated "github.com/khulnasoft/undiscriminated-go"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Union.Get(
        context.TODO(),
        &undiscriminated.MyUnion{
            String: "string",
        },
    )
}
