using SeedIdempotencyHeaders.Core;

namespace SeedIdempotencyHeaders;

public partial class SeedIdempotencyHeadersClient
{
    private readonly RawClient _client;

    public SeedIdempotencyHeadersClient(string? token = null, ClientOptions? clientOptions = null)
    {
        var defaultHeaders = new Headers(
            new Dictionary<string, string>()
            {
                { "Authorization", $"Bearer {token}" },
                { "X-Rapiddocs-Language", "C#" },
                { "X-Rapiddocs-SDK-Name", "SeedIdempotencyHeaders" },
                { "X-Rapiddocs-SDK-Version", Version.Current },
                { "User-Agent", "Rapiddocsidempotency-headers/0.0.1" },
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
        Payment = new PaymentClient(_client);
    }

    public PaymentClient Payment { get; init; }
}
