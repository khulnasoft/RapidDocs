package example

import (
    client "github.com/khulnasoft/path-parameters-go/client"
    option "github.com/khulnasoft/path-parameters-go/option"
    context "context"
    path "github.com/khulnasoft/path-parameters-go"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Organizations.SearchOrganizations(
        context.TODO(),
        "tenant_id",
        "organization_id",
        &path.SearchOrganizationsRequest{
            Limit: path.Int(
                1,
            ),
        },
    )
}
