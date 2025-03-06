package example

import (
    client "github.com/single-url-environment-no-default/rapiddocs/client"
    option "github.com/single-url-environment-no-default/rapiddocs/option"
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
