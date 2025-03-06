package example

import (
    client "github.com/grpc-proto-exhaustive/rapiddocs/client"
    option "github.com/grpc-proto-exhaustive/rapiddocs/option"
    context "context"
    rapiddocs "github.com/grpc-proto-exhaustive/rapiddocs"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Dataservice.Delete(
        context.TODO(),
        &rapiddocs.DeleteRequest{
            Ids: []string{
                "ids",
                "ids",
            },
            DeleteAll: rapiddocs.Bool(
                true,
            ),
            Namespace: rapiddocs.String(
                "namespace",
            ),
            Filter: &rapiddocs.Metadata{
                StringMetadataValueMap: map[string]*rapiddocs.MetadataValue{
                    "filter": &rapiddocs.MetadataValue{
                        Double: 1.1,
                    },
                },
            },
        },
    )
}
