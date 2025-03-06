package example

import (
    client "github.com/alias/rapiddocs/client"
    option "github.com/alias/rapiddocs/option"
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
        "typeId",
    )
}
