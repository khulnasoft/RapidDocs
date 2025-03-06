package example

import (
    client "github.com/idempotency-headers/rapiddocs/client"
    option "github.com/idempotency-headers/rapiddocs/option"
    context "context"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
        option.WithToken(
            "<token>",
        ),
    )
    client.Payment.Delete(
        context.TODO(),
        "paymentId",
    )
}
