using SeedStreaming.Core;

namespace SeedStreaming;

public partial class SeedStreamingClient
{
    private readonly RawClient _client;

    public SeedStreamingClient(ClientOptions? clientOptions = null)
    {
        var defaultHeaders = new Headers(
            new Dictionary<string, string>()
            {
                { "X-Rapiddocs-Language", "C#" },
                { "X-Rapiddocs-SDK-Name", "SeedStreaming" },
                { "X-Rapiddocs-SDK-Version", Version.Current },
                { "User-Agent", "Rapiddocsstreaming-parameter/0.0.1" },
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
