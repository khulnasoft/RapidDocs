<?php

namespace Example;

use Seed\SeedClient;

$client = new SeedClient(
    apiKey: '<token>',
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->service->getWithBearerToken();
