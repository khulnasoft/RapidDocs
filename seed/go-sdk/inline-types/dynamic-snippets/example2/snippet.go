package example

import (
    client "github.com/inline-types/rapiddocs/client"
    context "context"
    rapiddocs "github.com/inline-types/rapiddocs"
)

func do() () {
    client := client.NewClient()
    client.GetUndiscriminatedUnion(
        context.TODO(),
        &rapiddocs.GetUndiscriminatedUnionRequest{
            Bar: &rapiddocs.UndiscriminatedUnion1{
                UndiscriminatedUnion1InlineType1: &rapiddocs.UndiscriminatedUnion1InlineType1{
                    Foo: "foo",
                    Bar: &rapiddocs.UndiscriminatedUnion1InlineType1InlineType1{
                        Foo: "foo",
                        Ref: &rapiddocs.ReferenceType{
                            Foo: "foo",
                        },
                    },
                    Ref: &rapiddocs.ReferenceType{
                        Foo: "foo",
                    },
                },
            },
            Foo: "foo",
        },
    )
}
