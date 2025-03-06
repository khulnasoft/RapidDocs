<?php

namespace Example;

use Seed\SeedClient;
use Seed\Types\Object\Types\ObjectWithRequiredField;

$client = new SeedClient(
    token: '<token>',
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->endpoints->object->getAndReturnWithRequiredField(
    new ObjectWithRequiredField([
        'string' => 'string',
    ]),
);
