package example

import (
    rapiddocs "github.com/package-yml/rapiddocs"
    option "github.com/package-yml/rapiddocs/option"
    context "context"
)

func do() () {
    client := rapiddocs.New(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Echo(
        context.TODO(),
        "id",
        &rapiddocs.EchoRequest{
            Name: "name",
            Size: 1,
        },
    )
}
