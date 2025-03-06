package example

import (
    client "github.com/literal/rapiddocs/client"
    option "github.com/literal/rapiddocs/option"
    context "context"
    rapiddocs "github.com/literal/rapiddocs"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Reference.Send(
        context.TODO(),
        &rapiddocs.SendRequest{
            Query: "What is the weather today",
            ContainerObject: &rapiddocs.ContainerObject{
                NestedObjects: []*rapiddocs.NestedObjectWithLiterals{
                    &rapiddocs.NestedObjectWithLiterals{
                        StrProp: "strProp",
                    },
                },
            },
        },
    )
}
