<?php

namespace Example;

use Seed\SeedClient;

$client = new SeedClient(
    customAuthScheme: '<value>',
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->customAuth->postWithCustomAuth(
    [
        'key' => "value",
    ],
);
