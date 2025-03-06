package example

import (
    client "github.com/error-property/rapiddocs/client"
    option "github.com/error-property/rapiddocs/option"
    context "context"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.PropertyBasedError.ThrowError(
        context.TODO(),
    )
}
