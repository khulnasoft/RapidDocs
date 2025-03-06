using SeedUnknownAsAny.Core;

namespace SeedUnknownAsAny;

public partial class SeedUnknownAsAnyClient
{
    private readonly RawClient _client;

    public SeedUnknownAsAnyClient(ClientOptions? clientOptions = null)
    {
        var defaultHeaders = new Headers(
            new Dictionary<string, string>()
            {
                { "X-Rapiddocs-Language", "C#" },
                { "X-Rapiddocs-SDK-Name", "SeedUnknownAsAny" },
                { "X-Rapiddocs-SDK-Version", Version.Current },
                { "User-Agent", "Rapiddocsunknown/0.0.1" },
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
        Unknown = new UnknownClient(_client);
    }

    public UnknownClient Unknown { get; init; }
}
