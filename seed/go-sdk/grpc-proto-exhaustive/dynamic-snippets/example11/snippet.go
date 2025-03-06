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
    client.Dataservice.Query(
        context.TODO(),
        &rapiddocs.QueryRequest{
            Namespace: rapiddocs.String(
                "namespace",
            ),
            TopK: 1,
            Filter: &rapiddocs.Metadata{
                StringMetadataValueMap: map[string]*rapiddocs.MetadataValue{
                    "filter": &rapiddocs.MetadataValue{
                        Double: 1.1,
                    },
                },
            },
            IncludeValues: rapiddocs.Bool(
                true,
            ),
            IncludeMetadata: rapiddocs.Bool(
                true,
            ),
            Queries: []*rapiddocs.QueryColumn{
                &rapiddocs.QueryColumn{
                    Values: []float64{
                        1.1,
                        1.1,
                    },
                    TopK: rapiddocs.Int(
                        1,
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
                &rapiddocs.QueryColumn{
                    Values: []float64{
                        1.1,
                        1.1,
                    },
                    TopK: rapiddocs.Int(
                        1,
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
            },
            Column: []float64{
                1.1,
                1.1,
            },
            Id: rapiddocs.String(
                "id",
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
