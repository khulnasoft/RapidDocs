package example

import (
    client "github.com/no-environment/rapiddocs/client"
    option "github.com/no-environment/rapiddocs/option"
    context "context"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
        option.WithToken(
            "<token>",
        ),
    )
    client.Dummy.GetDummy(
        context.TODO(),
    )
}
