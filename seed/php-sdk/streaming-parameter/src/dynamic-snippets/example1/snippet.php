<?php

namespace Example;

use Seed\SeedClient;
use Seed\Dummy\Requests\GenerateRequest;

$client = new SeedClient(
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->dummy->generate(
    new GenerateRequest([
        'stream' => true,
        'numEvents' => 1,
    ]),
);
