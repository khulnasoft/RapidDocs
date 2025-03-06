package example

import (
    client "github.com/examples/rapiddocs/client"
    option "github.com/examples/rapiddocs/option"
    context "context"
)

func do() () {
    client := client.NewAcmeClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
        option.WithToken(
            "<token>",
        ),
    )
    client.Health.Service.Check(
        context.TODO(),
        "id-3tey93i",
    )
}
