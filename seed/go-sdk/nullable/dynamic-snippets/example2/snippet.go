package example

import (
    client "github.com/nullable/rapiddocs/client"
    option "github.com/nullable/rapiddocs/option"
    context "context"
    rapiddocs "github.com/nullable/rapiddocs"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Nullable.DeleteUser(
        context.TODO(),
        &rapiddocs.DeleteUserRequest{
            Username: rapiddocs.String(
                "xy",
            ),
        },
    )
}
