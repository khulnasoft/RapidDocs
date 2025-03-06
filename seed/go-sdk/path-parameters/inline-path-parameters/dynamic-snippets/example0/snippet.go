package example

import (
    client "github.com/khulnasoft/path-parameters-go/client"
    option "github.com/khulnasoft/path-parameters-go/option"
    context "context"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Organizations.GetOrganization(
        context.TODO(),
        "tenant_id",
        "organization_id",
    )
}
