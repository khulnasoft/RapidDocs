<?php

namespace Example;

use Seed\SeedClient;
use Seed\Commons\Types\Language;

$client = new SeedClient(
    token: '<token>',
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->submission->createExecutionSession(
    Language::Java->value,
);
