package example

import (
    client "github.com/package-yml/rapiddocs/client"
    option "github.com/package-yml/rapiddocs/option"
    context "context"
)

func do() () {
    client := client.NewClient(
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
