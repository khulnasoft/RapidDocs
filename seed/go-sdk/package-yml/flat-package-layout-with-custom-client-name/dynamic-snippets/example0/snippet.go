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
        "id-ksfd9c1",
        &rapiddocs.EchoRequest{
            Name: "Hello world!",
            Size: 20,
        },
    )
}
