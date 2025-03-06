package example

import (
    client "github.com/mixed-case/rapiddocs/client"
    option "github.com/mixed-case/rapiddocs/option"
    context "context"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Service.GetResource(
        context.TODO(),
        "ResourceID",
    )
}
