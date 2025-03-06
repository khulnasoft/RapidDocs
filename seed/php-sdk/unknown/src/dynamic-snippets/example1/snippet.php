<?php

namespace Example;

use Seed\SeedClient;
use Seed\Unknown\Types\MyObject;

$client = new SeedClient(
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->unknown->postObject(
    new MyObject([
        'unknown' => [
            'key' => "value",
        ],
    ]),
);
