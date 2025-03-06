package example

import (
    client "github.com/literal/rapiddocs/client"
    option "github.com/literal/rapiddocs/option"
    context "context"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Path.Send(
        context.TODO(),
    )
}
