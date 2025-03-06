package example

import (
    client "github.com/go-content-type/rapiddocs/client"
    option "github.com/go-content-type/rapiddocs/option"
    context "context"
    rapiddocs "github.com/go-content-type/rapiddocs"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
        option.WithToken(
            "<token>",
        ),
    )
    client.Imdb.CreateMovie(
        context.TODO(),
        &rapiddocs.CreateMovieRequest{
            Title: "title",
            Rating: 1.1,
        },
    )
}
