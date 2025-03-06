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
    client.User.SearchUsers(
        context.TODO(),
        &path.SearchUsersRequest{
            TenantId: "tenant_id",
            UserId: "user_id",
            Limit: path.Int(
                1,
            ),
        },
    )
}
