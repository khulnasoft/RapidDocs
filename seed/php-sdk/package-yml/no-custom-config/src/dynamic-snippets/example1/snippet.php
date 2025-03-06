<?php

namespace Example;

use Seed\SeedClient;
use Seed\Types\EchoRequest;

$client = new SeedClient(
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->echo_(
    'id',
    new EchoRequest([
        'name' => 'name',
        'size' => 1,
    ]),
);
