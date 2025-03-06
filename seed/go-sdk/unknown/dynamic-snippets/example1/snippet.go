package example

import (
    client "github.com/unknown/rapiddocs/client"
    option "github.com/unknown/rapiddocs/option"
    context "context"
    rapiddocs "github.com/unknown/rapiddocs"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Unknown.PostObject(
        context.TODO(),
        &rapiddocs.MyObject{
            Unknown: map[string]interface{}{
                "key": "value",
            },
        },
    )
}
