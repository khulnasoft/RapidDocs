package example

import (
    client "github.com/imdb/rapiddocs/client"
    option "github.com/imdb/rapiddocs/option"
    context "context"
    rapiddocs "github.com/imdb/rapiddocs"
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
