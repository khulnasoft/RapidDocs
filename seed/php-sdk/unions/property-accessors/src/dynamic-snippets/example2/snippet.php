<?php

namespace Example;

use Seed\SeedClient;
use Seed\Bigunion\Types\BigUnion;
use DateTime;
use Seed\Bigunion\Types\NormalSweet;

$client = new SeedClient(
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->bigunion->updateMany(
    [
        BigUnion::normalSweet('id', new DateTime('2024-01-15T09:30:00Z'), new DateTime('2024-01-15T09:30:00Z'), new NormalSweet([
            'value' => 'value',
        ])),
        BigUnion::normalSweet('id', new DateTime('2024-01-15T09:30:00Z'), new DateTime('2024-01-15T09:30:00Z'), new NormalSweet([
            'value' => 'value',
        ])),
    ],
);
