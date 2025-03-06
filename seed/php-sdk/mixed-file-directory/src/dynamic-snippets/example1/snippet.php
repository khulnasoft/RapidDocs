<?php

namespace Example;

use Seed\SeedClient;
use Seed\User\Requests\ListUsersRequest;

$client = new SeedClient(
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->user->list(
    new ListUsersRequest([
        'limit' => 1,
    ]),
);
