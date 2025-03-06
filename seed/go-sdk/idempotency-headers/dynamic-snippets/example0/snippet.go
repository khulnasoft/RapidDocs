package example

import (
    client "github.com/idempotency-headers/rapiddocs/client"
    option "github.com/idempotency-headers/rapiddocs/option"
    context "context"
    rapiddocs "github.com/idempotency-headers/rapiddocs"
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
    client.Payment.Create(
        context.TODO(),
        &rapiddocs.CreatePaymentRequest{
            Amount: 1,
            Currency: rapiddocs.CurrencyUsd,
        },
    )
}
