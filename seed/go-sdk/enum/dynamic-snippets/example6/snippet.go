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
    client.QueryParam.SendList(
        context.TODO(),
        &rapiddocs.SendEnumListAsQueryParamRequest{
            Operand: []rapiddocs.Operand{
                rapiddocs.OperandGreaterThan,
            },
            MaybeOperand: []*rapiddocs.Operand{
                rapiddocs.OperandGreaterThan.Ptr(),
            },
            OperandOrColor: []*rapiddocs.ColorOrOperand{
                &rapiddocs.ColorOrOperand{
                    Color: rapiddocs.ColorRed,
                },
            },
            MaybeOperandOrColor: []*rapiddocs.ColorOrOperand{
                &rapiddocs.ColorOrOperand{
                    Color: rapiddocs.ColorRed,
                },
            },
        },
    )
}
