<?php

namespace Example;

use Seed\SeedClient;

$client = new SeedClient(
    username: '<username>',
    accessToken: '<password>',
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->basicAuth->getWithBasicAuth();
