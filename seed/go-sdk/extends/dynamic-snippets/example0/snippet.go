package example

import (
    client "github.com/extends/rapiddocs/client"
    option "github.com/extends/rapiddocs/option"
    context "context"
    rapiddocs "github.com/extends/rapiddocs"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.ExtendedInlineRequestBody(
        context.TODO(),
        &rapiddocs.Inlined{
            Docs: "docs",
            Name: "name",
            Unique: "unique",
        },
    )
}
