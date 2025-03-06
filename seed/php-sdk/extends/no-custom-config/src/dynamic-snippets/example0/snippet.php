<?php

namespace Example;

use Seed\SeedClient;
use Seed\Requests\Inlined;

$client = new SeedClient(
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->extendedInlineRequestBody(
    new Inlined([
        'docs' => 'docs',
        'name' => 'name',
        'unique' => 'unique',
    ]),
);
