package example

import (
    client "github.com/simple-fhir/rapiddocs/client"
    option "github.com/simple-fhir/rapiddocs/option"
    context "context"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.GetAccount(
        context.TODO(),
        "account_id",
    )
}
