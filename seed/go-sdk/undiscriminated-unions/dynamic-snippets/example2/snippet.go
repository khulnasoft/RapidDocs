package example

import (
    client "github.com/khulnasoft/undiscriminated-go/client"
    option "github.com/khulnasoft/undiscriminated-go/option"
    context "context"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Union.GetMetadata(
        context.TODO(),
    )
}
