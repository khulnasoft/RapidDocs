package example

import (
    client "github.com/examples-minimal/rapiddocs/client"
    option "github.com/examples-minimal/rapiddocs/option"
    context "context"
    rapiddocs "github.com/examples-minimal/rapiddocs"
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
    client.Service.CreateBigEntity(
        context.TODO(),
        &rapiddocs.Test{
            U: map[string]string{
                "u": "u",
            },
            V: []string{
                "v",
            },
        },
    )
}
