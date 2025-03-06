<?php

namespace Example;

use Seed\SeedClient;
use Seed\File\Service\Requests\GetFileRequest;

$client = new SeedClient(
    token: '<token>',
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->file->service->getFile(
    'file.txt',
    new GetFileRequest([
        'xFileApiVersion' => '0.0.2',
    ]),
);
