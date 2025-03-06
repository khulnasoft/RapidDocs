<?php

namespace Example;

use Seed\SeedClient;
use Seed\Imdb\Types\CreateMovieRequest;

$client = new SeedClient(
    token: '<token>',
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->imdb->createMovie(
    new CreateMovieRequest([
        'title' => 'title',
        'rating' => 1.1,
    ]),
);
