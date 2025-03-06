<?php

namespace Example;

use Seed\SeedClient;
use Seed\User\Events\Metadata\Requests\GetEventMetadataRequest;

$client = new SeedClient(
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->user->events->metadata->getMetadata(
    new GetEventMetadataRequest([
        'id' => 'id',
    ]),
);
