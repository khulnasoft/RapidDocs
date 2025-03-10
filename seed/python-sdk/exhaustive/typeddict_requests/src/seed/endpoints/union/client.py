# This file was auto-generated by Rapiddocs from our API Definition.

import typing
from json.decoder import JSONDecodeError

from ...core.api_error import ApiError
from ...core.client_wrapper import AsyncClientWrapper, SyncClientWrapper
from ...core.pydantic_utilities import parse_obj_as
from ...core.request_options import RequestOptions
from ...core.serialization import convert_and_respect_annotation_metadata
from ...types.union.requests.animal import AnimalParams
from ...types.union.types.animal import Animal

# this is used as the default value for optional parameters
OMIT = typing.cast(typing.Any, ...)


class UnionClient:
    def __init__(self, *, client_wrapper: SyncClientWrapper):
        self._client_wrapper = client_wrapper

    def get_and_return_union(
        self, *, request: AnimalParams, request_options: typing.Optional[RequestOptions] = None
    ) -> Animal:
        """
        Parameters
        ----------
        request : AnimalParams

        request_options : typing.Optional[RequestOptions]
            Request-specific configuration.

        Returns
        -------
        Animal

        Examples
        --------
        from seed import SeedExhaustive

        client = SeedExhaustive(
            token="YOUR_TOKEN",
            base_url="https://yourhost.com/path/to/api",
        )
        client.endpoints.union.get_and_return_union(
            request={"name": "string", "likes_to_woof": True, "animal": "dog"},
        )
        """
        _response = self._client_wrapper.httpx_client.request(
            "union",
            method="POST",
            json=convert_and_respect_annotation_metadata(object_=request, annotation=AnimalParams),
            request_options=request_options,
            omit=OMIT,
        )
        try:
            if 200 <= _response.status_code < 300:
                return typing.cast(Animal, parse_obj_as(type_=Animal, object_=_response.json()))  # type: ignore
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)


class AsyncUnionClient:
    def __init__(self, *, client_wrapper: AsyncClientWrapper):
        self._client_wrapper = client_wrapper

    async def get_and_return_union(
        self, *, request: AnimalParams, request_options: typing.Optional[RequestOptions] = None
    ) -> Animal:
        """
        Parameters
        ----------
        request : AnimalParams

        request_options : typing.Optional[RequestOptions]
            Request-specific configuration.

        Returns
        -------
        Animal

        Examples
        --------
        import asyncio

        from seed import AsyncSeedExhaustive

        client = AsyncSeedExhaustive(
            token="YOUR_TOKEN",
            base_url="https://yourhost.com/path/to/api",
        )


        async def main() -> None:
            await client.endpoints.union.get_and_return_union(
                request={"name": "string", "likes_to_woof": True, "animal": "dog"},
            )


        asyncio.run(main())
        """
        _response = await self._client_wrapper.httpx_client.request(
            "union",
            method="POST",
            json=convert_and_respect_annotation_metadata(object_=request, annotation=AnimalParams),
            request_options=request_options,
            omit=OMIT,
        )
        try:
            if 200 <= _response.status_code < 300:
                return typing.cast(Animal, parse_obj_as(type_=Animal, object_=_response.json()))  # type: ignore
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)
