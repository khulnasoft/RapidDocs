package example

import (
    client "github.com/folders/rapiddocs/client"
    option "github.com/folders/rapiddocs/option"
    context "context"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Folder.Service.UnknownRequest(
        context.TODO(),
        map[string]interface{}{
            "key": "value",
        },
    )
}
