package example

import (
    client "github.com/audiences/rapiddocs/client"
    option "github.com/audiences/rapiddocs/option"
    context "context"
    rapiddocs "github.com/audiences/rapiddocs"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Foo.Find(
        context.TODO(),
        &rapiddocs.FindRequest{
            OptionalString: rapiddocs.String(
                "optionalString",
            ),
            PublicProperty: rapiddocs.String(
                "publicProperty",
            ),
            PrivateProperty: rapiddocs.Int(
                1,
            ),
        },
    )
}
