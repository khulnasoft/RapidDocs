package example

import (
    client "github.com/grpc-proto/rapiddocs/client"
    option "github.com/grpc-proto/rapiddocs/option"
    context "context"
    rapiddocs "github.com/grpc-proto/rapiddocs"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Userservice.Create(
        context.TODO(),
        &rapiddocs.CreateRequest{},
    )
}
