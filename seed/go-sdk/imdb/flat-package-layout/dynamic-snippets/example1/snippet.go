package example

import (
    rapiddocs "github.com/imdb/rapiddocs"
    option "github.com/imdb/rapiddocs/option"
    context "context"
)

func do() () {
    client := rapiddocs.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
        option.WithToken(
            "<token>",
        ),
    )
    client.Imdb.GetMovie(
        context.TODO(),
        "movieId",
    )
}
