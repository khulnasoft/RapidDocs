<?php

namespace Example;

use Seed\SeedClient;
use Seed\Organization\Types\CreateOrganizationRequest;

$client = new SeedClient(
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->organization->create(
    new CreateOrganizationRequest([
        'name' => 'name',
    ]),
);
