package example

import (
    client "github.com/examples/rapiddocs/client"
    option "github.com/examples/rapiddocs/option"
    context "context"
    file "github.com/examples/rapiddocs/file"
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
    client.File.Service.GetFile(
        context.TODO(),
        "file.txt",
        &file.GetFileRequest{
            XFileApiVersion: "0.0.2",
        },
    )
}
