package example

import (
    client "github.com/inline-types/rapiddocs/client"
    context "context"
    rapiddocs "github.com/inline-types/rapiddocs"
)

func do() () {
    client := client.NewClient()
    client.GetDiscriminatedUnion(
        context.TODO(),
        &rapiddocs.GetDiscriminatedUnionRequest{
            Bar: &rapiddocs.DiscriminatedUnion1{
                Type1: &rapiddocs.DiscriminatedUnion1InlineType1{
                    Foo: "foo",
                    Bar: &rapiddocs.DiscriminatedUnion1InlineType1InlineType1{
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
