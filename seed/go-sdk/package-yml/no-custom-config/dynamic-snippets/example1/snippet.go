package example

import (
    client "github.com/package-yml/rapiddocs/client"
    option "github.com/package-yml/rapiddocs/option"
    context "context"
    rapiddocs "github.com/package-yml/rapiddocs"
)

func do() () {
    client := client.NewClient(
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
