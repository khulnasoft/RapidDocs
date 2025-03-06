package example

import (
    client "github.com/path-parameters/rapiddocs/client"
    option "github.com/path-parameters/rapiddocs/option"
    context "context"
    rapiddocs "github.com/path-parameters/rapiddocs"
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
        &rapiddocs.SearchOrganizationsRequest{
            Limit: rapiddocs.Int(
                1,
            ),
        },
    )
}
