<?php

namespace Example;

use Seed\SeedClient;
use Seed\Headers\Requests\SendLiteralsInHeadersRequest;

$client = new SeedClient(
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->headers->send(
    new SendLiteralsInHeadersRequest([
        'endpointVersion' => '02-12-2024',
        'async' => true,
        'query' => 'What is the weather today',
    ]),
);
