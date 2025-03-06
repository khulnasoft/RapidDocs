package example

import (
    client "github.com/license/rapiddocs/client"
    option "github.com/license/rapiddocs/option"
    context "context"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Get(
        context.TODO(),
    )
}
