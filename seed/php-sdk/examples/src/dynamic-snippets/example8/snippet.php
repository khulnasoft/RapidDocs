<?php

namespace Example;

use Seed\SeedClient;

$client = new SeedClient(
    token: '<token>',
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->health->service->check(
    'id-3tey93i',
);
