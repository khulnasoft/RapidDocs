<?php

namespace Example;

use Seed\SeedClient;
use Seed\Service\Requests\HeaderAuthRequest;

$client = new SeedClient(
    apiKey: '<value>',
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->service->getWithHeader(
    new HeaderAuthRequest([
        'xEndpointHeader' => 'X-Endpoint-Header',
    ]),
);
