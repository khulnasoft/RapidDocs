package example

import (
    client "github.com/api-wide-base-path/rapiddocs/client"
    option "github.com/api-wide-base-path/rapiddocs/option"
    context "context"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Service.Post(
        context.TODO(),
        "pathParam",
        "serviceParam",
        "resourceParam",
        1,
    )
}
