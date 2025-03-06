package example

import (
    client "github.com/multi-url-environment-no-default/rapiddocs/client"
    option "github.com/multi-url-environment-no-default/rapiddocs/option"
    context "context"
    rapiddocs "github.com/multi-url-environment-no-default/rapiddocs"
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
    client.Ec2.BootInstance(
        context.TODO(),
        &rapiddocs.BootInstanceRequest{
            Size: "size",
        },
    )
}
