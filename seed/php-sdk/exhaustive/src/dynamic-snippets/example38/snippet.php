<?php

namespace Example;

use Seed\SeedClient;
use Seed\Types\Union\Types\Animal;
use Seed\Types\Union\Types\Dog;

$client = new SeedClient(
    token: '<token>',
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->endpoints->union->getAndReturnUnion(
    Animal::dog(new Dog([
        'name' => 'name',
        'likesToWoof' => true,
    ])),
);
