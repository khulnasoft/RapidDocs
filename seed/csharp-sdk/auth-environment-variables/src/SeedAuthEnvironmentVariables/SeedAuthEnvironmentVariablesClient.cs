using SeedAuthEnvironmentVariables.Core;

namespace SeedAuthEnvironmentVariables;

public partial class SeedAuthEnvironmentVariablesClient
{
    private readonly RawClient _client;

    public SeedAuthEnvironmentVariablesClient(
        string xAnotherHeader,
        string? apiKey = null,
        ClientOptions? clientOptions = null
    )
    {
        apiKey ??= GetFromEnvironmentOrThrow(
            "RAPIDDOCS_API_KEY",
            "Please pass in apiKey or set the environment variable RAPIDDOCS_API_KEY."
        );
        var defaultHeaders = new Headers(
            new Dictionary<string, string>()
            {
                { "X-Another-Header", xAnotherHeader },
                { "X-RAPIDDOCS-API-KEY", apiKey },
                { "X-API-Version", "01-01-2000" },
                { "X-Rapiddocs-Language", "C#" },
                { "X-Rapiddocs-SDK-Name", "SeedAuthEnvironmentVariables" },
                { "X-Rapiddocs-SDK-Version", Version.Current },
                { "User-Agent", "Rapiddocsauth-environment-variables/0.0.1" },
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
        Service = new ServiceClient(_client);
    }

    public ServiceClient Service { get; init; }

    private static string GetFromEnvironmentOrThrow(string env, string message)
    {
        return Environment.GetEnvironmentVariable(env) ?? throw new Exception(message);
    }
}
