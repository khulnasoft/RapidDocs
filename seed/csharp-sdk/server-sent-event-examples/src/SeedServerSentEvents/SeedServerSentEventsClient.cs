using SeedServerSentEvents.Core;

namespace SeedServerSentEvents;

public partial class SeedServerSentEventsClient
{
    private readonly RawClient _client;

    public SeedServerSentEventsClient(ClientOptions? clientOptions = null)
    {
        var defaultHeaders = new Headers(
            new Dictionary<string, string>()
            {
                { "X-Rapiddocs-Language", "C#" },
                { "X-Rapiddocs-SDK-Name", "SeedServerSentEvents" },
                { "X-Rapiddocs-SDK-Version", Version.Current },
                { "User-Agent", "Rapiddocsserver-sent-event-examples/0.0.1" },
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
        Completions = new CompletionsClient(_client);
    }

    public CompletionsClient Completions { get; init; }
}
