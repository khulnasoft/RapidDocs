using SeedOauthClientCredentialsEnvironmentVariables.Core;

namespace SeedOauthClientCredentialsEnvironmentVariables;

public partial class SeedOauthClientCredentialsEnvironmentVariablesClient
{
    private readonly RawClient _client;

    public SeedOauthClientCredentialsEnvironmentVariablesClient(
        string? clientId = null,
        string? clientSecret = null,
        ClientOptions? clientOptions = null
    )
    {
        clientId ??= GetFromEnvironmentOrThrow(
            "CLIENT_ID",
            "Please pass in clientId or set the environment variable CLIENT_ID."
        );
        clientSecret ??= GetFromEnvironmentOrThrow(
            "CLIENT_SECRET",
            "Please pass in clientSecret or set the environment variable CLIENT_SECRET."
        );
        var defaultHeaders = new Headers(
            new Dictionary<string, string>()
            {
                { "X-Rapiddocs-Language", "C#" },
                { "X-Rapiddocs-SDK-Name", "SeedOauthClientCredentialsEnvironmentVariables" },
                { "X-Rapiddocs-SDK-Version", Version.Current },
                { "User-Agent", "Rapiddocsoauth-client-credentials-environment-variables/0.0.1" },
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
        var tokenProvider = new OAuthTokenProvider(
            clientId,
            clientSecret,
            new AuthClient(new RawClient(clientOptions.Clone()))
        );
        clientOptions.Headers["Authorization"] = new Func<string>(
            () => tokenProvider.GetAccessTokenAsync().Result
        );
        _client = new RawClient(clientOptions);
        Auth = new AuthClient(_client);
    }

    public AuthClient Auth { get; init; }

    private static string GetFromEnvironmentOrThrow(string env, string message)
    {
        return Environment.GetEnvironmentVariable(env) ?? throw new Exception(message);
    }
}
