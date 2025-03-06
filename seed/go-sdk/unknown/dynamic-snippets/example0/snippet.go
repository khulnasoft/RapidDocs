package example

import (
    client "github.com/unknown/rapiddocs/client"
    option "github.com/unknown/rapiddocs/option"
    context "context"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Unknown.Post(
        context.TODO(),
        map[string]interface{}{
            "key": "value",
        },
    )
}
