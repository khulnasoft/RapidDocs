<?php

namespace Example;

use Seed\SeedClient;
use Seed\Reference\Types\SendRequest;
use Seed\Reference\Types\ContainerObject;
use Seed\Reference\Types\NestedObjectWithLiterals;

$client = new SeedClient(
    options: [
        'baseUrl' => 'https://api.rapiddocs.com',
    ],
);
$client->reference->send(
    new SendRequest([
        'prompt' => 'You are a helpful assistant',
        'stream' => false,
        'context' => "You're super wise",
        'query' => 'What is the weather today',
        'containerObject' => new ContainerObject([
            'nestedObjects' => [
                new NestedObjectWithLiterals([
                    'literal1' => 'literal1',
                    'literal2' => 'literal2',
                    'strProp' => 'strProp',
                ]),
            ],
        ]),
    ]),
);
