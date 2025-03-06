package example

import (
    rapiddocs "github.com/imdb/rapiddocs"
    option "github.com/imdb/rapiddocs/option"
    context "context"
)

func do() () {
    client := rapiddocs.New(
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
