package example

import (
    client "github.com/mixed-file-directory/rapiddocs/client"
    option "github.com/mixed-file-directory/rapiddocs/option"
    context "context"
    events "github.com/mixed-file-directory/rapiddocs/user/events"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.User.Events.Metadata.GetMetadata(
        context.TODO(),
        &events.GetEventMetadataRequest{
            Id: "id",
        },
    )
}
