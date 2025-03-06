package example

import (
    client "github.com/variables/rapiddocs/client"
    option "github.com/variables/rapiddocs/option"
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
        "endpointParam",
    )
}
