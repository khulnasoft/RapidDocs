package example

import (
    client "github.com/examples/rapiddocs/client"
    option "github.com/examples/rapiddocs/option"
    context "context"
)

func do() () {
    client := client.NewAcme(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
        option.WithToken(
            "<token>",
        ),
    )
    client.Echo(
        context.TODO(),
        "Hello world!\n\nwith\n\tnewlines",
    )
}
