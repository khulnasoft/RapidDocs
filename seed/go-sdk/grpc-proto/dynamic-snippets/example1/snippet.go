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
        &rapiddocs.CreateRequest{
            Username: rapiddocs.String(
                "username",
            ),
            Email: rapiddocs.String(
                "email",
            ),
            Age: rapiddocs.Int(
                1,
            ),
            Weight: rapiddocs.Float64(
                1.1,
            ),
            Metadata: &rapiddocs.Metadata{
                StringMetadataValueMap: map[string]*rapiddocs.MetadataValue{
                    "metadata": &rapiddocs.MetadataValue{
                        Double: 1.1,
                    },
                },
            },
        },
    )
}
