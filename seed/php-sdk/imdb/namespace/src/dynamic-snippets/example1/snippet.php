<?php

namespace Example;

use Rapiddocs\SeedClient;

$client = new SeedClient(
    token: '<token>',
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->imdb->getMovie(
    'movieId',
);
