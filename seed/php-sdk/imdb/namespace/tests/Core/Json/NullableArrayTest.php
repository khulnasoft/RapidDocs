<?php

namespace Rapiddocs\Tests\Core\Json;

use PHPUnit\Framework\TestCase;
use Rapiddocs\Core\Json\JsonProperty;
use Rapiddocs\Core\Json\JsonSerializableType;
use Rapiddocs\Core\Types\ArrayType;
use Rapiddocs\Core\Types\Union;

class NullableArray extends JsonSerializableType
{
    /**
     * @var array<string|null> $nullableStringArray
     */
    #[ArrayType([new Union('string', 'null')])]
    #[JsonProperty('nullable_string_array')]
    public array $nullableStringArray;

    /**
     * @param array{
     *   nullableStringArray: array<string|null>,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->nullableStringArray = $values['nullableStringArray'];
    }
}

class NullableArrayTest extends TestCase
{
    public function testNullableArray(): void
    {
        $expectedJson = json_encode(
            [
                'nullable_string_array' => ['one', null, 'three']
            ],
            JSON_THROW_ON_ERROR
        );

        $object = NullableArray::fromJson($expectedJson);
        $this->assertEquals(['one', null, 'three'], $object->nullableStringArray, 'nullable_string_array should match the original data.');

        $actualJson = $object->toJson();
        $this->assertJsonStringEqualsJsonString($expectedJson, $actualJson, 'Serialized JSON does not match original JSON for nullable_string_array.');
    }
}
