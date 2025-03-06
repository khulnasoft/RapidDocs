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
        "id-ksfd9c1",
        &rapiddocs.EchoRequest{
            Name: "Hello world!",
            Size: 20,
        },
    )
}
