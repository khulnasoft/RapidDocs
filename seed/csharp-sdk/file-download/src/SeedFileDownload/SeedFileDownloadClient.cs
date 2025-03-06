using SeedFileDownload.Core;

namespace SeedFileDownload;

public partial class SeedFileDownloadClient
{
    private readonly RawClient _client;

    public SeedFileDownloadClient(ClientOptions? clientOptions = null)
    {
        var defaultHeaders = new Headers(
            new Dictionary<string, string>()
            {
                { "X-Rapiddocs-Language", "C#" },
                { "X-Rapiddocs-SDK-Name", "SeedFileDownload" },
                { "X-Rapiddocs-SDK-Version", Version.Current },
                { "User-Agent", "Rapiddocsfile-download/0.0.1" },
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
}
