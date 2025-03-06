<?php

namespace Example;

use Seed\SeedClient;
use Seed\Users\Requests\ListUsersMixedTypeCursorPaginationRequest;

$client = new SeedClient(
    token: '<token>',
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->users->listWithMixedTypeCursorPagination(
    new ListUsersMixedTypeCursorPaginationRequest([
        'cursor' => 'cursor',
    ]),
);
