<?php

namespace Rapiddocs;

use Rapiddocs\Imdb\ImdbClient;
use GuzzleHttp\ClientInterface;
use Rapiddocs\Core\Client\RawClient;

class SeedClient
{
    /**
     * @var ImdbClient $imdb
     */
    public ImdbClient $imdb;

    /**
     * @var array{
     *   baseUrl?: string,
     *   client?: ClientInterface,
     *   maxRetries?: int,
     *   timeout?: float,
     *   headers?: array<string, string>,
     * } $options
     */
    private array $options;

    /**
     * @var RawClient $client
     */
    private RawClient $client;

    /**
     * @param ?string $token The token to use for authentication.
     * @param ?array{
     *   baseUrl?: string,
     *   client?: ClientInterface,
     *   maxRetries?: int,
     *   timeout?: float,
     *   headers?: array<string, string>,
     * } $options
     */
    public function __construct(
        ?string $token = null,
        ?array $options = null,
    ) {
        $defaultHeaders = [
            'X-Rapiddocs-Language' => 'PHP',
            'X-Rapiddocs-SDK-Name' => 'Rapiddocs',
            'X-Rapiddocs-SDK-Version' => '0.0.1',
            'User-Agent' => 'seed/seed/0.0.1',
        ];
        if ($token != null) {
            $defaultHeaders['Authorization'] = "Bearer $token";
        }

        $this->options = $options ?? [];
        $this->options['headers'] = array_merge(
            $defaultHeaders,
            $this->options['headers'] ?? [],
        );

        $this->client = new RawClient(
            options: $this->options,
        );

        $this->imdb = new ImdbClient($this->client, $this->options);
    }
}
