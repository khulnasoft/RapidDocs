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
    client.Organizations.GetOrganizationUser(
        context.TODO(),
        &path.GetOrganizationUserRequest{
            TenantId: "tenant_id",
            OrganizationId: "organization_id",
            UserId: "user_id",
        },
    )
}
