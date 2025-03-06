package example

import (
    client "github.com/khulnasoft/unions-go/client"
    option "github.com/khulnasoft/unions-go/option"
    context "context"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Bigunion.Get(
        context.TODO(),
        "id",
    )
}
