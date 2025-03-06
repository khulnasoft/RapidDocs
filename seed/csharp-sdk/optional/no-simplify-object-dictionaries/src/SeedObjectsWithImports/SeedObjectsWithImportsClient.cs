using SeedObjectsWithImports.Core;

namespace SeedObjectsWithImports;

public partial class SeedObjectsWithImportsClient
{
    private readonly RawClient _client;

    public SeedObjectsWithImportsClient(ClientOptions? clientOptions = null)
    {
        var defaultHeaders = new Headers(
            new Dictionary<string, string>()
            {
                { "X-Rapiddocs-Language", "C#" },
                { "X-Rapiddocs-SDK-Name", "SeedObjectsWithImports" },
                { "X-Rapiddocs-SDK-Version", Version.Current },
                { "User-Agent", "Rapiddocsoptional/0.0.1" },
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
        Optional = new OptionalClient(_client);
    }

    public OptionalClient Optional { get; init; }
}
