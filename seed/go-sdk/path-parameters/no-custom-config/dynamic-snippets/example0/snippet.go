package example

import (
    client "github.com/path-parameters/rapiddocs/client"
    option "github.com/path-parameters/rapiddocs/option"
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
