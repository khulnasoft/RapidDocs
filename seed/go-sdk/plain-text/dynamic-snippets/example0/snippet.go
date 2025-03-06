package example

import (
    client "github.com/plain-text/rapiddocs/client"
    option "github.com/plain-text/rapiddocs/option"
    context "context"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Service.GetText(
        context.TODO(),
    )
}
