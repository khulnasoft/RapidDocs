<?php

namespace Example;

use Seed\SeedClient;

$client = new SeedClient(
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->service->nop(
    'id-a2ijs82',
    'id-219xca8',
);
