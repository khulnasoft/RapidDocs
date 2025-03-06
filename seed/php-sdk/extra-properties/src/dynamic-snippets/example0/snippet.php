<?php

namespace Example;

use Seed\SeedClient;
use Seed\User\Requests\CreateUserRequest;

$client = new SeedClient(
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->user->createUser(
    new CreateUserRequest([
        'type' => 'CreateUserRequest',
        'version' => 'v1',
        'name' => 'name',
    ]),
);
