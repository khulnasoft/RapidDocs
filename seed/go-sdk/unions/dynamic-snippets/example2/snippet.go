package example

import (
    client "github.com/khulnasoft/unions-go/client"
    option "github.com/khulnasoft/unions-go/option"
    context "context"
    unions "github.com/khulnasoft/unions-go"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Bigunion.UpdateMany(
        context.TODO(),
        []*unions.BigUnion{
            &unions.BigUnion{
                NormalSweet: &unions.NormalSweet{
                    Value: "value",
                },
                Id: "id",
                CreatedAt: unions.MustParseDateTime(
                    "2024-01-15T09:30:00Z",
                ),
                ArchivedAt: unions.Time(
                    unions.MustParseDateTime(
                        "2024-01-15T09:30:00Z",
                    ),
                ),
            },
            &unions.BigUnion{
                NormalSweet: &unions.NormalSweet{
                    Value: "value",
                },
                Id: "id",
                CreatedAt: unions.MustParseDateTime(
                    "2024-01-15T09:30:00Z",
                ),
                ArchivedAt: unions.Time(
                    unions.MustParseDateTime(
                        "2024-01-15T09:30:00Z",
                    ),
                ),
            },
        },
    )
}
