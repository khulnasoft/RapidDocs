package example

import (
    client "github.com/enum/rapiddocs/client"
    option "github.com/enum/rapiddocs/option"
    context "context"
    rapiddocs "github.com/enum/rapiddocs"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.PathParam.Send(
        context.TODO(),
        rapiddocs.OperandGreaterThan,
        &rapiddocs.ColorOrOperand{
            Color: rapiddocs.ColorRed,
        },
    )
}
