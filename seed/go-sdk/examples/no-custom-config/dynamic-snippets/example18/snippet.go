package example

import (
    client "github.com/examples/rapiddocs/client"
    option "github.com/examples/rapiddocs/option"
    context "context"
    rapiddocs "github.com/examples/rapiddocs"
    commons "github.com/examples/rapiddocs/commons"
    uuid "github.com/google/uuid"
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
    client.Service.CreateBigEntity(
        context.TODO(),
        &rapiddocs.BigEntity{
            CastMember: &rapiddocs.CastMember{
                Actor: &rapiddocs.Actor{
                    Name: "name",
                    Id: "id",
                },
            },
            ExtendedMovie: &rapiddocs.ExtendedMovie{
                Id: "id",
                Prequel: rapiddocs.String(
                    "prequel",
                ),
                Title: "title",
                From: "from",
                Rating: 1.1,
                Tag: "tag",
                Book: rapiddocs.String(
                    "book",
                ),
                Metadata: map[string]interface{}{
                    "metadata": map[string]interface{}{
                        "key": "value",
                    },
                },
                Revenue: 1000000,
                Cast: []string{
                    "cast",
                    "cast",
                },
            },
            Entity: &rapiddocs.Entity{
                Type: &rapiddocs.Type{
                    BasicType: rapiddocs.BasicTypePrimitive,
                },
                Name: "name",
            },
            Metadata: &rapiddocs.Metadata{
                Extra: map[string]string{
                    "extra": "extra",
                },
                Tags: []string{
                    "tags",
                },
            },
            CommonMetadata: &commons.Metadata{
                Id: "id",
                Data: map[string]string{
                    "data": "data",
                },
                JsonString: rapiddocs.String(
                    "jsonString",
                ),
            },
            EventInfo: &commons.EventInfo{
                Metadata: &commons.Metadata{
                    Id: "id",
                    Data: map[string]string{
                        "data": "data",
                    },
                    JsonString: rapiddocs.String(
                        "jsonString",
                    ),
                },
            },
            Data: &commons.Data{},
            Migration: &rapiddocs.Migration{
                Name: "name",
                Status: rapiddocs.MigrationStatusRunning,
            },
            Exception: &rapiddocs.Exception{
                Generic: &rapiddocs.ExceptionInfo{
                    ExceptionType: "exceptionType",
                    ExceptionMessage: "exceptionMessage",
                    ExceptionStacktrace: "exceptionStacktrace",
                },
            },
            Test: &rapiddocs.Test{},
            Node: &rapiddocs.Node{
                Name: "name",
                Nodes: []*rapiddocs.Node{
                    &rapiddocs.Node{
                        Name: "name",
                        Nodes: []*rapiddocs.Node{
                            &rapiddocs.Node{
                                Name: "name",
                                Nodes: []*rapiddocs.Node{},
                                Trees: []*rapiddocs.Tree{},
                            },
                            &rapiddocs.Node{
                                Name: "name",
                                Nodes: []*rapiddocs.Node{},
                                Trees: []*rapiddocs.Tree{},
                            },
                        },
                        Trees: []*rapiddocs.Tree{
                            &rapiddocs.Tree{
                                Nodes: []*rapiddocs.Node{},
                            },
                            &rapiddocs.Tree{
                                Nodes: []*rapiddocs.Node{},
                            },
                        },
                    },
                    &rapiddocs.Node{
                        Name: "name",
                        Nodes: []*rapiddocs.Node{
                            &rapiddocs.Node{
                                Name: "name",
                                Nodes: []*rapiddocs.Node{},
                                Trees: []*rapiddocs.Tree{},
                            },
                            &rapiddocs.Node{
                                Name: "name",
                                Nodes: []*rapiddocs.Node{},
                                Trees: []*rapiddocs.Tree{},
                            },
                        },
                        Trees: []*rapiddocs.Tree{
                            &rapiddocs.Tree{
                                Nodes: []*rapiddocs.Node{},
                            },
                            &rapiddocs.Tree{
                                Nodes: []*rapiddocs.Node{},
                            },
                        },
                    },
                },
                Trees: []*rapiddocs.Tree{
                    &rapiddocs.Tree{
                        Nodes: []*rapiddocs.Node{
                            &rapiddocs.Node{
                                Name: "name",
                                Nodes: []*rapiddocs.Node{},
                                Trees: []*rapiddocs.Tree{},
                            },
                            &rapiddocs.Node{
                                Name: "name",
                                Nodes: []*rapiddocs.Node{},
                                Trees: []*rapiddocs.Tree{},
                            },
                        },
                    },
                    &rapiddocs.Tree{
                        Nodes: []*rapiddocs.Node{
                            &rapiddocs.Node{
                                Name: "name",
                                Nodes: []*rapiddocs.Node{},
                                Trees: []*rapiddocs.Tree{},
                            },
                            &rapiddocs.Node{
                                Name: "name",
                                Nodes: []*rapiddocs.Node{},
                                Trees: []*rapiddocs.Tree{},
                            },
                        },
                    },
                },
            },
            Directory: &rapiddocs.Directory{
                Name: "name",
                Files: []*rapiddocs.File{
                    &rapiddocs.File{
                        Name: "name",
                        Contents: "contents",
                    },
                    &rapiddocs.File{
                        Name: "name",
                        Contents: "contents",
                    },
                },
                Directories: []*rapiddocs.Directory{
                    &rapiddocs.Directory{
                        Name: "name",
                        Files: []*rapiddocs.File{
                            &rapiddocs.File{
                                Name: "name",
                                Contents: "contents",
                            },
                            &rapiddocs.File{
                                Name: "name",
                                Contents: "contents",
                            },
                        },
                        Directories: []*rapiddocs.Directory{
                            &rapiddocs.Directory{
                                Name: "name",
                                Files: []*rapiddocs.File{},
                                Directories: []*rapiddocs.Directory{},
                            },
                            &rapiddocs.Directory{
                                Name: "name",
                                Files: []*rapiddocs.File{},
                                Directories: []*rapiddocs.Directory{},
                            },
                        },
                    },
                    &rapiddocs.Directory{
                        Name: "name",
                        Files: []*rapiddocs.File{
                            &rapiddocs.File{
                                Name: "name",
                                Contents: "contents",
                            },
                            &rapiddocs.File{
                                Name: "name",
                                Contents: "contents",
                            },
                        },
                        Directories: []*rapiddocs.Directory{
                            &rapiddocs.Directory{
                                Name: "name",
                                Files: []*rapiddocs.File{},
                                Directories: []*rapiddocs.Directory{},
                            },
                            &rapiddocs.Directory{
                                Name: "name",
                                Files: []*rapiddocs.File{},
                                Directories: []*rapiddocs.Directory{},
                            },
                        },
                    },
                },
            },
            Moment: &rapiddocs.Moment{
                Id: uuid.MustParse(
                    "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32",
                ),
                Date: rapiddocs.MustParseDateTime(
                    "2023-01-15",
                ),
                Datetime: rapiddocs.MustParseDateTime(
                    "2024-01-15T09:30:00Z",
                ),
            },
        },
    )
}
