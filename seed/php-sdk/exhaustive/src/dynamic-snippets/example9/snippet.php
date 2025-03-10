<?php

namespace Example;

use Seed\SeedClient;
use Seed\Types\Enum\Types\WeatherReport;

$client = new SeedClient(
    token: '<token>',
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->endpoints->enum->getAndReturnEnum(
    WeatherReport::Sunny->value,
);
