package example

import (
    client "github.com/cross-package-type-names/rapiddocs/client"
    option "github.com/cross-package-type-names/rapiddocs/option"
    context "context"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.FolderA.Service.GetDirectThread(
        context.TODO(),
    )
}
