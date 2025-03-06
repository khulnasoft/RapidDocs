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
    client.Dataservice.Update(
        context.TODO(),
        &rapiddocs.UpdateRequest{
            Id: "id",
            Values: []float64{
                1.1,
                1.1,
            },
            SetMetadata: &rapiddocs.Metadata{
                StringMetadataValueMap: map[string]*rapiddocs.MetadataValue{
                    "setMetadata": &rapiddocs.MetadataValue{
                        Double: 1.1,
                    },
                },
            },
            Namespace: rapiddocs.String(
                "namespace",
            ),
            IndexedData: &rapiddocs.IndexedData{
                Indices: []int{
                    1,
                    1,
                },
                Values: []float64{
                    1.1,
                    1.1,
                },
            },
        },
    )
}
