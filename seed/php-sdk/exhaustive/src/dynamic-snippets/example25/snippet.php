<?php

namespace Example;

use Seed\SeedClient;
use Seed\Endpoints\Params\Requests\GetWithPathAndQuery;

$client = new SeedClient(
    token: '<token>',
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->endpoints->params->getWithPathAndQuery(
    'param',
    new GetWithPathAndQuery([
        'query' => 'query',
    ]),
);
