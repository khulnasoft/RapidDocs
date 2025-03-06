<?php

namespace Example;

use Seed\SeedClient;
use Seed\User\Events\Requests\ListUserEventsRequest;

$client = new SeedClient(
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->user->events->listEvents(
    new ListUserEventsRequest([
        'limit' => 1,
    ]),
);
