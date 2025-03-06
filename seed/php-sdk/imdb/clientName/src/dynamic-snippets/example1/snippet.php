<?php

namespace Example;

use Seed\RapiddocsClient;

$client = new RapiddocsClient(
    token: '<token>',
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->imdb->getMovie(
    'movieId',
);
