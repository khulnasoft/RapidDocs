package example

import (
    client "github.com/mixed-case/rapiddocs/client"
    option "github.com/mixed-case/rapiddocs/option"
    context "context"
    rapiddocs "github.com/mixed-case/rapiddocs"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
    )
    client.Service.ListResources(
        context.TODO(),
        &rapiddocs.ListResourcesRequest{
            PageLimit: 1,
            BeforeDate: rapiddocs.MustParseDateTime(
                "2023-01-15",
            ),
        },
    )
}
