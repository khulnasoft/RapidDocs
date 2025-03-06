<?php

namespace Example;

use Seed\SeedClient;

$client = new SeedClient(
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->user->getUser(
    'tenant_id',
    'user_id',
);
