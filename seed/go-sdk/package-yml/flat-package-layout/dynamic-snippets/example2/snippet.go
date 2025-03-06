package example

import (
    rapiddocs "github.com/package-yml/rapiddocs"
    option "github.com/package-yml/rapiddocs/option"
    context "context"
)

func do() () {
    client := rapiddocs.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Service.Nop(
        context.TODO(),
        "id-a2ijs82",
        "id-219xca8",
    )
}
