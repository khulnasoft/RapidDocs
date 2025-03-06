<?php

namespace Example;

use Seed\SeedClient;
use Seed\Nullable\Requests\DeleteUserRequest;

$client = new SeedClient(
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->nullable->deleteUser(
    new DeleteUserRequest([
        'username' => 'xy',
    ]),
);
