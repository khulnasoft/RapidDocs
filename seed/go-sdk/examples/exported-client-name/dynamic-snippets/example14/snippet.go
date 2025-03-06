package example

import (
    client "github.com/examples/rapiddocs/client"
    option "github.com/examples/rapiddocs/option"
    context "context"
    rapiddocs "github.com/examples/rapiddocs"
)

func do() () {
    client := client.NewAcmeClient(
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
            Id: "movie-c06a4ad7",
            Prequel: rapiddocs.String(
                "movie-cv9b914f",
            ),
            Title: "The Boy and the Heron",
            From: "Hayao Miyazaki",
            Rating: 8,
            Tag: "tag-wf9as23d",
            Metadata: map[string]interface{}{
                "actors": []interface{}{
                    "Christian Bale",
                    "Florence Pugh",
                    "Willem Dafoe",
                },
                "releaseDate": "2023-12-08",
                "ratings": map[string]interface{}{
                    "rottenTomatoes": 97,
                    "imdb": 7.6,
                },
            },
            Revenue: 1000000,
        },
    )
}
