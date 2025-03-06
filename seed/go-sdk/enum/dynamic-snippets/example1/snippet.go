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
    client.InlinedRequest.Send(
        context.TODO(),
        &rapiddocs.SendEnumInlinedRequest{
            Operand: rapiddocs.OperandGreaterThan,
            MaybeOperand: rapiddocs.OperandGreaterThan.Ptr(),
            OperandOrColor: &rapiddocs.ColorOrOperand{
                Color: rapiddocs.ColorRed,
            },
            MaybeOperandOrColor: &rapiddocs.ColorOrOperand{
                Color: rapiddocs.ColorRed,
            },
        },
    )
}
