package example

import (
    client "github.com/response-property/rapiddocs/client"
    option "github.com/response-property/rapiddocs/option"
    context "context"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Service.GetMovie(
        context.TODO(),
        "string",
    )
}
