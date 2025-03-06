package example

import (
    client "github.com/query-parameters/rapiddocs/client"
    option "github.com/query-parameters/rapiddocs/option"
    context "context"
    rapiddocs "github.com/query-parameters/rapiddocs"
    uuid "github.com/google/uuid"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.User.GetUsername(
        context.TODO(),
        &rapiddocs.GetUsersRequest{
            Limit: 1,
            Id: uuid.MustParse(
                "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32",
            ),
            Date: rapiddocs.MustParseDateTime(
                "2023-01-15",
            ),
            Deadline: rapiddocs.MustParseDateTime(
                "2024-01-15T09:30:00Z",
            ),
            Bytes: []byte("SGVsbG8gd29ybGQh"),
            User: &rapiddocs.User{
                Name: "name",
                Tags: []string{
                    "tags",
                    "tags",
                },
            },
            UserList: []*rapiddocs.User{
                &rapiddocs.User{
                    Name: "name",
                    Tags: []string{
                        "tags",
                        "tags",
                    },
                },
                &rapiddocs.User{
                    Name: "name",
                    Tags: []string{
                        "tags",
                        "tags",
                    },
                },
            },
            OptionalDeadline: rapiddocs.Time(
                rapiddocs.MustParseDateTime(
                    "2024-01-15T09:30:00Z",
                ),
            ),
            KeyValue: map[string]string{
                "keyValue": "keyValue",
            },
            OptionalString: rapiddocs.String(
                "optionalString",
            ),
            NestedUser: &rapiddocs.NestedUser{
                Name: "name",
                User: &rapiddocs.User{
                    Name: "name",
                    Tags: []string{
                        "tags",
                        "tags",
                    },
                },
            },
            OptionalUser: &rapiddocs.User{
                Name: "name",
                Tags: []string{
                    "tags",
                    "tags",
                },
            },
            ExcludeUser: []*rapiddocs.User{
                &rapiddocs.User{
                    Name: "name",
                    Tags: []string{
                        "tags",
                        "tags",
                    },
                },
            },
            Filter: []string{
                "filter",
            },
        },
    )
}
