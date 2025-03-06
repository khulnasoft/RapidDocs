package example

import (
    client "github.com/optional/rapiddocs/client"
    option "github.com/optional/rapiddocs/option"
    context "context"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Optional.SendOptionalBody(
        context.TODO(),
        map[string]interface{}{
            "string": map[string]interface{}{
                "key": "value",
            },
        },
    )
}
