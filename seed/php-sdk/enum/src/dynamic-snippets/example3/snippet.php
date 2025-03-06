<?php

namespace Example;

use Seed\SeedClient;
use Seed\Types\Operand;
use Seed\Types\Color;

$client = new SeedClient(
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->pathParam->send(
    Operand::GreaterThan->value,
    Color::Red->value,
);
