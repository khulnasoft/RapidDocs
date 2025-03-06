<?php

namespace Example;

use Seed\SeedClient;
use Seed\Service\Requests\GetMetadataRequest;

$client = new SeedClient(
    token: '<token>',
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->service->getMetadata(
    new GetMetadataRequest([
        'shallow' => true,
        'tag' => [
            'tag',
        ],
        'xApiVersion' => 'X-API-Version',
    ]),
);
