<?php

namespace Example;

use Seed\SeedClient;
use Seed\Endpoints\Params\Requests\GetWithQuery;

$client = new SeedClient(
    token: '<token>',
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->endpoints->params->getWithQuery(
    new GetWithQuery([
        'query' => 'query',
        'number' => 1,
    ]),
);
