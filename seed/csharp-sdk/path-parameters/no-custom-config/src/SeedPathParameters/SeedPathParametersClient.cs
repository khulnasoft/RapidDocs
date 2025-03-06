using SeedPathParameters.Core;

namespace SeedPathParameters;

public partial class SeedPathParametersClient
{
    private readonly RawClient _client;

    public SeedPathParametersClient(ClientOptions? clientOptions = null)
    {
        var defaultHeaders = new Headers(
            new Dictionary<string, string>()
            {
                { "X-Rapiddocs-Language", "C#" },
                { "X-Rapiddocs-SDK-Name", "SeedPathParameters" },
                { "X-Rapiddocs-SDK-Version", Version.Current },
                { "User-Agent", "Rapiddocspath-parameters/0.0.1" },
            }
        );
        clientOptions ??= new ClientOptions();
        foreach (var header in defaultHeaders)
        {
            if (!clientOptions.Headers.ContainsKey(header.Key))
            {
                clientOptions.Headers[header.Key] = header.Value;
            }
        }
        _client = new RawClient(clientOptions);
        Organizations = new OrganizationsClient(_client);
        User = new UserClient(_client);
    }

    public OrganizationsClient Organizations { get; init; }

    public UserClient User { get; init; }
}
