package example

import (
    client "github.com/inline-types/rapiddocs/client"
    context "context"
    rapiddocs "github.com/inline-types/rapiddocs"
)

func do() () {
    client := client.NewClient()
    client.GetRoot(
        context.TODO(),
        &rapiddocs.PostRootRequest{
            Bar: &rapiddocs.RequestTypeInlineType1{
                Foo: "foo",
            },
            Foo: "foo",
        },
    )
}
