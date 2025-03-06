package example

import (
    client "github.com/basic-auth/rapiddocs/client"
    option "github.com/basic-auth/rapiddocs/option"
    context "context"
)

func do() () {
    client := client.NewClient(
        option.WithBaseURL(
            "https://api.rapiddocs.com",
        ),
        option.WithBasicAuth(
            "<username>",
            "<password>",
        ),
    )
    client.BasicAuth.PostWithBasicAuth(
        context.TODO(),
        map[string]interface{}{
            "key": "value",
        },
    )
}
