<?php

namespace Example;

use Seed\SeedClient;

$client = new SeedClient(
    token: '<token>',
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->endpoints->primitive->getAndReturnDouble(
    1.1,
);
