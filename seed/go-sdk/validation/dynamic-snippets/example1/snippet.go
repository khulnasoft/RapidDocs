package example

import (
    client "github.com/validation/rapiddocs/client"
    option "github.com/validation/rapiddocs/option"
    context "context"
    rapiddocs "github.com/validation/rapiddocs"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Get(
        context.TODO(),
        &rapiddocs.GetRequest{
            Decimal: 2.2,
            Even: 100,
            Name: "foo",
        },
    )
}
