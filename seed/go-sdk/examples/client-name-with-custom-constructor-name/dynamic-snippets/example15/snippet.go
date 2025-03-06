package example

import (
    client "github.com/examples/rapiddocs/client"
    option "github.com/examples/rapiddocs/option"
    context "context"
    rapiddocs "github.com/examples/rapiddocs"
)

func do() () {
    client := client.New(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
        option.WithToken(
            "<token>",
        ),
    )
    client.Service.CreateMovie(
        context.TODO(),
        &rapiddocs.Movie{
            Id: "id",
            Prequel: rapiddocs.String(
                "prequel",
            ),
            Title: "title",
            From: "from",
            Rating: 1.1,
            Tag: "tag",
            Book: rapiddocs.String(
                "book",
            ),
            Metadata: map[string]interface{}{
                "metadata": map[string]interface{}{
                    "key": "value",
                },
            },
            Revenue: 1000000,
        },
    )
}
