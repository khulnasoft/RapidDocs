package example

import (
    client "github.com/examples-minimal/rapiddocs/client"
    option "github.com/examples-minimal/rapiddocs/option"
    context "context"
    rapiddocs "github.com/examples-minimal/rapiddocs"
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
    client.Service.GetMovie(
        context.TODO(),
        &rapiddocs.ExtendedMovie{
            Foo: "foo",
            Bar: 1,
            Cast: []string{
                "cast",
                "cast",
            },
        },
    )
}
