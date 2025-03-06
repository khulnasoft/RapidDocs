<?php

namespace Example;

use Seed\RapiddocsClient;
use Seed\Imdb\Types\CreateMovieRequest;

$client = new RapiddocsClient(
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
