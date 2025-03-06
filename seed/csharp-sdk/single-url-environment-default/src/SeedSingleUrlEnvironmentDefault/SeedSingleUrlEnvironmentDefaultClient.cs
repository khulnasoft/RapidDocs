using SeedSingleUrlEnvironmentDefault.Core;

namespace SeedSingleUrlEnvironmentDefault;

public partial class SeedSingleUrlEnvironmentDefaultClient
{
    private readonly RawClient _client;

    public SeedSingleUrlEnvironmentDefaultClient(
        string? token = null,
        ClientOptions? clientOptions = null
    )
    {
        var defaultHeaders = new Headers(
            new Dictionary<string, string>()
            {
                { "Authorization", $"Bearer {token}" },
                { "X-Rapiddocs-Language", "C#" },
                { "X-Rapiddocs-SDK-Name", "SeedSingleUrlEnvironmentDefault" },
                { "X-Rapiddocs-SDK-Version", Version.Current },
                { "User-Agent", "Rapiddocssingle-url-environment-default/0.0.1" },
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
        Dummy = new DummyClient(_client);
    }

    public DummyClient Dummy { get; init; }
}
