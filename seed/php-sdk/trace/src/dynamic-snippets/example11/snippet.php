<?php

namespace Example;

use Seed\SeedClient;
use Seed\Migration\Requests\GetAttemptedMigrationsRequest;

$client = new SeedClient(
    token: '<token>',
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->migration->getAttemptedMigrations(
    new GetAttemptedMigrationsRequest([
        'adminKeyHeader' => 'admin-key-header',
    ]),
);
