# This file was auto-generated by Rapiddocs from our API Definition.

import typing

from seed import AsyncSeedExhaustive, SeedExhaustive

from ..utilities import validate_response


async def test_get_and_return_union(client: SeedExhaustive, async_client: AsyncSeedExhaustive) -> None:
    expected_response: typing.Any = {"animal": "dog", "name": "string", "likesToWoof": True}
    expected_types: typing.Any = "no_validate"
    response = client.endpoints.union.get_and_return_union(
        request={"name": "string", "likes_to_woof": True, "animal": "dog"}
    )
    validate_response(response, expected_response, expected_types)

    async_response = await async_client.endpoints.union.get_and_return_union(
        request={"name": "string", "likes_to_woof": True, "animal": "dog"}
    )
    validate_response(async_response, expected_response, expected_types)
