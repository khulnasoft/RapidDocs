<?php

namespace Example;

use Seed\SeedClient;
use Seed\User\Requests\GetUsersRequest;

$client = new SeedClient(
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->user->getUser(
    new GetUsersRequest([
        'tenantId' => 'tenant_id',
        'userId' => 'user_id',
    ]),
);
