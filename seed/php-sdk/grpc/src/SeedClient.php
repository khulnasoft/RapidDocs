<?php

namespace Seed;

use Seed\User\UserClient;
use GuzzleHttp\ClientInterface;
use Seed\Core\RawClient;

class SeedClient
{
    /**
     * @var UserClient $user
     */
    public UserClient $user;

    /**
     * @var ?array{baseUrl?: string, client?: ClientInterface, headers?: array<string, string>} $options
     */
    private ?array $options;

    /**
     * @var RawClient $client
     */
    private RawClient $client;

    /**
     * @param ?array{baseUrl?: string, client?: ClientInterface, headers?: array<string, string>} $options
     */
    public function __construct(
        ?array $options = null,
    ) {
        $defaultHeaders = [
            'X-Rapiddocs-Language' => 'PHP',
            'X-Rapiddocs-SDK-Name' => 'Seed',
            'X-Rapiddocs-SDK-Version' => '0.0.1',
        ];

        $this->options = $options ?? [];
        $this->options['headers'] = array_merge(
            $defaultHeaders,
            $this->options['headers'] ?? [],
        );

        $this->client = new RawClient(
            options: $this->options,
        );

        $this->user = new UserClient($this->client);
    }
}
