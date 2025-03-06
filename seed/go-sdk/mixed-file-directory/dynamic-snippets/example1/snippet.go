package example

import (
    client "github.com/mixed-file-directory/rapiddocs/client"
    option "github.com/mixed-file-directory/rapiddocs/option"
    context "context"
    rapiddocs "github.com/mixed-file-directory/rapiddocs"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.User.List(
        context.TODO(),
        &rapiddocs.ListUsersRequest{
            Limit: rapiddocs.Int(
                1,
            ),
        },
    )
}
