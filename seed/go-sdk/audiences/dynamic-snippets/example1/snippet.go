package example

import (
    client "github.com/audiences/rapiddocs/client"
    option "github.com/audiences/rapiddocs/option"
    context "context"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.FolderD.Service.GetDirectThread(
        context.TODO(),
    )
}
