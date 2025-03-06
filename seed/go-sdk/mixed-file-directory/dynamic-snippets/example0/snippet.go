package example

import (
    client "github.com/mixed-file-directory/rapiddocs/client"
    option "github.com/mixed-file-directory/rapiddocs/option"
    context "context"
    rapiddocs "github.com/mixed-file-directory/rapiddocs"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Organization.Create(
        context.TODO(),
        &rapiddocs.CreateOrganizationRequest{
            Name: "name",
        },
    )
}
