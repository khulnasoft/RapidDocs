<?php

namespace Example;

use Seed\SeedClient;

$client = new SeedClient(
    apiKey: '<value>',
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->service->getWithApiKey();
