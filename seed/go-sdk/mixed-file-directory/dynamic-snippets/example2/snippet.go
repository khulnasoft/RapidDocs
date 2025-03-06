package example

import (
    client "github.com/mixed-file-directory/rapiddocs/client"
    option "github.com/mixed-file-directory/rapiddocs/option"
    context "context"
    user "github.com/mixed-file-directory/rapiddocs/user"
    rapiddocs "github.com/mixed-file-directory/rapiddocs"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.User.Events.ListEvents(
        context.TODO(),
        &user.ListUserEventsRequest{
            Limit: rapiddocs.Int(
                1,
            ),
        },
    )
}
