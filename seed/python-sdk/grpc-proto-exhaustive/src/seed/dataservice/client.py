# This file was auto-generated by Rapiddocs from our API Definition.

import typing
from ..core.client_wrapper import SyncClientWrapper
from ..types.column import Column
from ..core.request_options import RequestOptions
from ..types.upload_response import UploadResponse
from ..core.serialization import convert_and_respect_annotation_metadata
from ..core.pydantic_utilities import parse_obj_as
from json.decoder import JSONDecodeError
from ..core.api_error import ApiError
from ..types.metadata import Metadata
from ..types.delete_response import DeleteResponse
from ..types.describe_response import DescribeResponse
from ..types.fetch_response import FetchResponse
from ..types.list_response import ListResponse
from ..types.query_column import QueryColumn
from ..types.indexed_data import IndexedData
from ..types.query_response import QueryResponse
from ..types.update_response import UpdateResponse
from ..core.client_wrapper import AsyncClientWrapper

# this is used as the default value for optional parameters
OMIT = typing.cast(typing.Any, ...)


class DataserviceClient:
    def __init__(self, *, client_wrapper: SyncClientWrapper):
        self._client_wrapper = client_wrapper

    def upload(
        self,
        *,
        columns: typing.Sequence[Column],
        namespace: typing.Optional[str] = OMIT,
        request_options: typing.Optional[RequestOptions] = None,
    ) -> UploadResponse:
        """
        Parameters
        ----------
        columns : typing.Sequence[Column]

        namespace : typing.Optional[str]

        request_options : typing.Optional[RequestOptions]
            Request-specific configuration.

        Returns
        -------
        UploadResponse
            OK

        Examples
        --------
        from seed import Column, SeedApi

        client = SeedApi(
            base_url="https://yourhost.com/path/to/api",
        )
        client.dataservice.upload(
            columns=[
                Column(
                    id="id",
                    values=[1.1],
                )
            ],
        )
        """
        _response = self._client_wrapper.httpx_client.request(
            "data",
            method="POST",
            json={
                "columns": convert_and_respect_annotation_metadata(
                    object_=columns, annotation=typing.Sequence[Column], direction="write"
                ),
                "namespace": namespace,
            },
            headers={
                "content-type": "application/json",
            },
            request_options=request_options,
            omit=OMIT,
        )
        try:
            if 200 <= _response.status_code < 300:
                return typing.cast(
                    UploadResponse,
                    parse_obj_as(
                        type_=UploadResponse,  # type: ignore
                        object_=_response.json(),
                    ),
                )
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    def delete(
        self,
        *,
        ids: typing.Optional[typing.Sequence[str]] = OMIT,
        delete_all: typing.Optional[bool] = OMIT,
        namespace: typing.Optional[str] = OMIT,
        filter: typing.Optional[Metadata] = OMIT,
        request_options: typing.Optional[RequestOptions] = None,
    ) -> DeleteResponse:
        """
        Parameters
        ----------
        ids : typing.Optional[typing.Sequence[str]]

        delete_all : typing.Optional[bool]

        namespace : typing.Optional[str]

        filter : typing.Optional[Metadata]

        request_options : typing.Optional[RequestOptions]
            Request-specific configuration.

        Returns
        -------
        DeleteResponse
            OK

        Examples
        --------
        from seed import SeedApi

        client = SeedApi(
            base_url="https://yourhost.com/path/to/api",
        )
        client.dataservice.delete()
        """
        _response = self._client_wrapper.httpx_client.request(
            "data/delete",
            method="POST",
            json={
                "ids": ids,
                "deleteAll": delete_all,
                "namespace": namespace,
                "filter": convert_and_respect_annotation_metadata(
                    object_=filter, annotation=Metadata, direction="write"
                ),
            },
            headers={
                "content-type": "application/json",
            },
            request_options=request_options,
            omit=OMIT,
        )
        try:
            if 200 <= _response.status_code < 300:
                return typing.cast(
                    DeleteResponse,
                    parse_obj_as(
                        type_=DeleteResponse,  # type: ignore
                        object_=_response.json(),
                    ),
                )
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    def describe(
        self, *, filter: typing.Optional[Metadata] = OMIT, request_options: typing.Optional[RequestOptions] = None
    ) -> DescribeResponse:
        """
        Parameters
        ----------
        filter : typing.Optional[Metadata]

        request_options : typing.Optional[RequestOptions]
            Request-specific configuration.

        Returns
        -------
        DescribeResponse
            OK

        Examples
        --------
        from seed import SeedApi

        client = SeedApi(
            base_url="https://yourhost.com/path/to/api",
        )
        client.dataservice.describe()
        """
        _response = self._client_wrapper.httpx_client.request(
            "data/describe",
            method="POST",
            json={
                "filter": convert_and_respect_annotation_metadata(
                    object_=filter, annotation=Metadata, direction="write"
                ),
            },
            headers={
                "content-type": "application/json",
            },
            request_options=request_options,
            omit=OMIT,
        )
        try:
            if 200 <= _response.status_code < 300:
                return typing.cast(
                    DescribeResponse,
                    parse_obj_as(
                        type_=DescribeResponse,  # type: ignore
                        object_=_response.json(),
                    ),
                )
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    def fetch(
        self,
        *,
        ids: typing.Optional[typing.Union[str, typing.Sequence[str]]] = None,
        namespace: typing.Optional[str] = None,
        request_options: typing.Optional[RequestOptions] = None,
    ) -> FetchResponse:
        """
        Parameters
        ----------
        ids : typing.Optional[typing.Union[str, typing.Sequence[str]]]

        namespace : typing.Optional[str]

        request_options : typing.Optional[RequestOptions]
            Request-specific configuration.

        Returns
        -------
        FetchResponse
            OK

        Examples
        --------
        from seed import SeedApi

        client = SeedApi(
            base_url="https://yourhost.com/path/to/api",
        )
        client.dataservice.fetch()
        """
        _response = self._client_wrapper.httpx_client.request(
            "data/fetch",
            method="GET",
            params={
                "ids": ids,
                "namespace": namespace,
            },
            request_options=request_options,
        )
        try:
            if 200 <= _response.status_code < 300:
                return typing.cast(
                    FetchResponse,
                    parse_obj_as(
                        type_=FetchResponse,  # type: ignore
                        object_=_response.json(),
                    ),
                )
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    def list(
        self,
        *,
        prefix: typing.Optional[str] = None,
        limit: typing.Optional[int] = None,
        pagination_token: typing.Optional[str] = None,
        namespace: typing.Optional[str] = None,
        request_options: typing.Optional[RequestOptions] = None,
    ) -> ListResponse:
        """
        Parameters
        ----------
        prefix : typing.Optional[str]

        limit : typing.Optional[int]

        pagination_token : typing.Optional[str]

        namespace : typing.Optional[str]

        request_options : typing.Optional[RequestOptions]
            Request-specific configuration.

        Returns
        -------
        ListResponse
            OK

        Examples
        --------
        from seed import SeedApi

        client = SeedApi(
            base_url="https://yourhost.com/path/to/api",
        )
        client.dataservice.list()
        """
        _response = self._client_wrapper.httpx_client.request(
            "data/list",
            method="GET",
            params={
                "prefix": prefix,
                "limit": limit,
                "paginationToken": pagination_token,
                "namespace": namespace,
            },
            request_options=request_options,
        )
        try:
            if 200 <= _response.status_code < 300:
                return typing.cast(
                    ListResponse,
                    parse_obj_as(
                        type_=ListResponse,  # type: ignore
                        object_=_response.json(),
                    ),
                )
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    def query(
        self,
        *,
        top_k: int,
        namespace: typing.Optional[str] = OMIT,
        filter: typing.Optional[Metadata] = OMIT,
        include_values: typing.Optional[bool] = OMIT,
        include_metadata: typing.Optional[bool] = OMIT,
        queries: typing.Optional[typing.Sequence[QueryColumn]] = OMIT,
        column: typing.Optional[typing.Sequence[float]] = OMIT,
        id: typing.Optional[str] = OMIT,
        indexed_data: typing.Optional[IndexedData] = OMIT,
        request_options: typing.Optional[RequestOptions] = None,
    ) -> QueryResponse:
        """
        Parameters
        ----------
        top_k : int

        namespace : typing.Optional[str]

        filter : typing.Optional[Metadata]

        include_values : typing.Optional[bool]

        include_metadata : typing.Optional[bool]

        queries : typing.Optional[typing.Sequence[QueryColumn]]

        column : typing.Optional[typing.Sequence[float]]

        id : typing.Optional[str]

        indexed_data : typing.Optional[IndexedData]

        request_options : typing.Optional[RequestOptions]
            Request-specific configuration.

        Returns
        -------
        QueryResponse
            OK

        Examples
        --------
        from seed import SeedApi

        client = SeedApi(
            base_url="https://yourhost.com/path/to/api",
        )
        client.dataservice.query(
            top_k=1,
        )
        """
        _response = self._client_wrapper.httpx_client.request(
            "data/query",
            method="POST",
            json={
                "namespace": namespace,
                "topK": top_k,
                "filter": convert_and_respect_annotation_metadata(
                    object_=filter, annotation=Metadata, direction="write"
                ),
                "includeValues": include_values,
                "includeMetadata": include_metadata,
                "queries": convert_and_respect_annotation_metadata(
                    object_=queries, annotation=typing.Sequence[QueryColumn], direction="write"
                ),
                "column": column,
                "id": id,
                "indexedData": convert_and_respect_annotation_metadata(
                    object_=indexed_data, annotation=IndexedData, direction="write"
                ),
            },
            headers={
                "content-type": "application/json",
            },
            request_options=request_options,
            omit=OMIT,
        )
        try:
            if 200 <= _response.status_code < 300:
                return typing.cast(
                    QueryResponse,
                    parse_obj_as(
                        type_=QueryResponse,  # type: ignore
                        object_=_response.json(),
                    ),
                )
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    def update(
        self,
        *,
        id: str,
        values: typing.Optional[typing.Sequence[float]] = OMIT,
        set_metadata: typing.Optional[Metadata] = OMIT,
        namespace: typing.Optional[str] = OMIT,
        indexed_data: typing.Optional[IndexedData] = OMIT,
        request_options: typing.Optional[RequestOptions] = None,
    ) -> UpdateResponse:
        """
        Parameters
        ----------
        id : str

        values : typing.Optional[typing.Sequence[float]]

        set_metadata : typing.Optional[Metadata]

        namespace : typing.Optional[str]

        indexed_data : typing.Optional[IndexedData]

        request_options : typing.Optional[RequestOptions]
            Request-specific configuration.

        Returns
        -------
        UpdateResponse
            OK

        Examples
        --------
        from seed import SeedApi

        client = SeedApi(
            base_url="https://yourhost.com/path/to/api",
        )
        client.dataservice.update(
            id="id",
        )
        """
        _response = self._client_wrapper.httpx_client.request(
            "data/update",
            method="POST",
            json={
                "id": id,
                "values": values,
                "setMetadata": convert_and_respect_annotation_metadata(
                    object_=set_metadata, annotation=Metadata, direction="write"
                ),
                "namespace": namespace,
                "indexedData": convert_and_respect_annotation_metadata(
                    object_=indexed_data, annotation=IndexedData, direction="write"
                ),
            },
            headers={
                "content-type": "application/json",
            },
            request_options=request_options,
            omit=OMIT,
        )
        try:
            if 200 <= _response.status_code < 300:
                return typing.cast(
                    UpdateResponse,
                    parse_obj_as(
                        type_=UpdateResponse,  # type: ignore
                        object_=_response.json(),
                    ),
                )
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)


class AsyncDataserviceClient:
    def __init__(self, *, client_wrapper: AsyncClientWrapper):
        self._client_wrapper = client_wrapper

    async def upload(
        self,
        *,
        columns: typing.Sequence[Column],
        namespace: typing.Optional[str] = OMIT,
        request_options: typing.Optional[RequestOptions] = None,
    ) -> UploadResponse:
        """
        Parameters
        ----------
        columns : typing.Sequence[Column]

        namespace : typing.Optional[str]

        request_options : typing.Optional[RequestOptions]
            Request-specific configuration.

        Returns
        -------
        UploadResponse
            OK

        Examples
        --------
        import asyncio

        from seed import AsyncSeedApi, Column

        client = AsyncSeedApi(
            base_url="https://yourhost.com/path/to/api",
        )


        async def main() -> None:
            await client.dataservice.upload(
                columns=[
                    Column(
                        id="id",
                        values=[1.1],
                    )
                ],
            )


        asyncio.run(main())
        """
        _response = await self._client_wrapper.httpx_client.request(
            "data",
            method="POST",
            json={
                "columns": convert_and_respect_annotation_metadata(
                    object_=columns, annotation=typing.Sequence[Column], direction="write"
                ),
                "namespace": namespace,
            },
            headers={
                "content-type": "application/json",
            },
            request_options=request_options,
            omit=OMIT,
        )
        try:
            if 200 <= _response.status_code < 300:
                return typing.cast(
                    UploadResponse,
                    parse_obj_as(
                        type_=UploadResponse,  # type: ignore
                        object_=_response.json(),
                    ),
                )
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    async def delete(
        self,
        *,
        ids: typing.Optional[typing.Sequence[str]] = OMIT,
        delete_all: typing.Optional[bool] = OMIT,
        namespace: typing.Optional[str] = OMIT,
        filter: typing.Optional[Metadata] = OMIT,
        request_options: typing.Optional[RequestOptions] = None,
    ) -> DeleteResponse:
        """
        Parameters
        ----------
        ids : typing.Optional[typing.Sequence[str]]

        delete_all : typing.Optional[bool]

        namespace : typing.Optional[str]

        filter : typing.Optional[Metadata]

        request_options : typing.Optional[RequestOptions]
            Request-specific configuration.

        Returns
        -------
        DeleteResponse
            OK

        Examples
        --------
        import asyncio

        from seed import AsyncSeedApi

        client = AsyncSeedApi(
            base_url="https://yourhost.com/path/to/api",
        )


        async def main() -> None:
            await client.dataservice.delete()


        asyncio.run(main())
        """
        _response = await self._client_wrapper.httpx_client.request(
            "data/delete",
            method="POST",
            json={
                "ids": ids,
                "deleteAll": delete_all,
                "namespace": namespace,
                "filter": convert_and_respect_annotation_metadata(
                    object_=filter, annotation=Metadata, direction="write"
                ),
            },
            headers={
                "content-type": "application/json",
            },
            request_options=request_options,
            omit=OMIT,
        )
        try:
            if 200 <= _response.status_code < 300:
                return typing.cast(
                    DeleteResponse,
                    parse_obj_as(
                        type_=DeleteResponse,  # type: ignore
                        object_=_response.json(),
                    ),
                )
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    async def describe(
        self, *, filter: typing.Optional[Metadata] = OMIT, request_options: typing.Optional[RequestOptions] = None
    ) -> DescribeResponse:
        """
        Parameters
        ----------
        filter : typing.Optional[Metadata]

        request_options : typing.Optional[RequestOptions]
            Request-specific configuration.

        Returns
        -------
        DescribeResponse
            OK

        Examples
        --------
        import asyncio

        from seed import AsyncSeedApi

        client = AsyncSeedApi(
            base_url="https://yourhost.com/path/to/api",
        )


        async def main() -> None:
            await client.dataservice.describe()


        asyncio.run(main())
        """
        _response = await self._client_wrapper.httpx_client.request(
            "data/describe",
            method="POST",
            json={
                "filter": convert_and_respect_annotation_metadata(
                    object_=filter, annotation=Metadata, direction="write"
                ),
            },
            headers={
                "content-type": "application/json",
            },
            request_options=request_options,
            omit=OMIT,
        )
        try:
            if 200 <= _response.status_code < 300:
                return typing.cast(
                    DescribeResponse,
                    parse_obj_as(
                        type_=DescribeResponse,  # type: ignore
                        object_=_response.json(),
                    ),
                )
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    async def fetch(
        self,
        *,
        ids: typing.Optional[typing.Union[str, typing.Sequence[str]]] = None,
        namespace: typing.Optional[str] = None,
        request_options: typing.Optional[RequestOptions] = None,
    ) -> FetchResponse:
        """
        Parameters
        ----------
        ids : typing.Optional[typing.Union[str, typing.Sequence[str]]]

        namespace : typing.Optional[str]

        request_options : typing.Optional[RequestOptions]
            Request-specific configuration.

        Returns
        -------
        FetchResponse
            OK

        Examples
        --------
        import asyncio

        from seed import AsyncSeedApi

        client = AsyncSeedApi(
            base_url="https://yourhost.com/path/to/api",
        )


        async def main() -> None:
            await client.dataservice.fetch()


        asyncio.run(main())
        """
        _response = await self._client_wrapper.httpx_client.request(
            "data/fetch",
            method="GET",
            params={
                "ids": ids,
                "namespace": namespace,
            },
            request_options=request_options,
        )
        try:
            if 200 <= _response.status_code < 300:
                return typing.cast(
                    FetchResponse,
                    parse_obj_as(
                        type_=FetchResponse,  # type: ignore
                        object_=_response.json(),
                    ),
                )
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    async def list(
        self,
        *,
        prefix: typing.Optional[str] = None,
        limit: typing.Optional[int] = None,
        pagination_token: typing.Optional[str] = None,
        namespace: typing.Optional[str] = None,
        request_options: typing.Optional[RequestOptions] = None,
    ) -> ListResponse:
        """
        Parameters
        ----------
        prefix : typing.Optional[str]

        limit : typing.Optional[int]

        pagination_token : typing.Optional[str]

        namespace : typing.Optional[str]

        request_options : typing.Optional[RequestOptions]
            Request-specific configuration.

        Returns
        -------
        ListResponse
            OK

        Examples
        --------
        import asyncio

        from seed import AsyncSeedApi

        client = AsyncSeedApi(
            base_url="https://yourhost.com/path/to/api",
        )


        async def main() -> None:
            await client.dataservice.list()


        asyncio.run(main())
        """
        _response = await self._client_wrapper.httpx_client.request(
            "data/list",
            method="GET",
            params={
                "prefix": prefix,
                "limit": limit,
                "paginationToken": pagination_token,
                "namespace": namespace,
            },
            request_options=request_options,
        )
        try:
            if 200 <= _response.status_code < 300:
                return typing.cast(
                    ListResponse,
                    parse_obj_as(
                        type_=ListResponse,  # type: ignore
                        object_=_response.json(),
                    ),
                )
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    async def query(
        self,
        *,
        top_k: int,
        namespace: typing.Optional[str] = OMIT,
        filter: typing.Optional[Metadata] = OMIT,
        include_values: typing.Optional[bool] = OMIT,
        include_metadata: typing.Optional[bool] = OMIT,
        queries: typing.Optional[typing.Sequence[QueryColumn]] = OMIT,
        column: typing.Optional[typing.Sequence[float]] = OMIT,
        id: typing.Optional[str] = OMIT,
        indexed_data: typing.Optional[IndexedData] = OMIT,
        request_options: typing.Optional[RequestOptions] = None,
    ) -> QueryResponse:
        """
        Parameters
        ----------
        top_k : int

        namespace : typing.Optional[str]

        filter : typing.Optional[Metadata]

        include_values : typing.Optional[bool]

        include_metadata : typing.Optional[bool]

        queries : typing.Optional[typing.Sequence[QueryColumn]]

        column : typing.Optional[typing.Sequence[float]]

        id : typing.Optional[str]

        indexed_data : typing.Optional[IndexedData]

        request_options : typing.Optional[RequestOptions]
            Request-specific configuration.

        Returns
        -------
        QueryResponse
            OK

        Examples
        --------
        import asyncio

        from seed import AsyncSeedApi

        client = AsyncSeedApi(
            base_url="https://yourhost.com/path/to/api",
        )


        async def main() -> None:
            await client.dataservice.query(
                top_k=1,
            )


        asyncio.run(main())
        """
        _response = await self._client_wrapper.httpx_client.request(
            "data/query",
            method="POST",
            json={
                "namespace": namespace,
                "topK": top_k,
                "filter": convert_and_respect_annotation_metadata(
                    object_=filter, annotation=Metadata, direction="write"
                ),
                "includeValues": include_values,
                "includeMetadata": include_metadata,
                "queries": convert_and_respect_annotation_metadata(
                    object_=queries, annotation=typing.Sequence[QueryColumn], direction="write"
                ),
                "column": column,
                "id": id,
                "indexedData": convert_and_respect_annotation_metadata(
                    object_=indexed_data, annotation=IndexedData, direction="write"
                ),
            },
            headers={
                "content-type": "application/json",
            },
            request_options=request_options,
            omit=OMIT,
        )
        try:
            if 200 <= _response.status_code < 300:
                return typing.cast(
                    QueryResponse,
                    parse_obj_as(
                        type_=QueryResponse,  # type: ignore
                        object_=_response.json(),
                    ),
                )
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    async def update(
        self,
        *,
        id: str,
        values: typing.Optional[typing.Sequence[float]] = OMIT,
        set_metadata: typing.Optional[Metadata] = OMIT,
        namespace: typing.Optional[str] = OMIT,
        indexed_data: typing.Optional[IndexedData] = OMIT,
        request_options: typing.Optional[RequestOptions] = None,
    ) -> UpdateResponse:
        """
        Parameters
        ----------
        id : str

        values : typing.Optional[typing.Sequence[float]]

        set_metadata : typing.Optional[Metadata]

        namespace : typing.Optional[str]

        indexed_data : typing.Optional[IndexedData]

        request_options : typing.Optional[RequestOptions]
            Request-specific configuration.

        Returns
        -------
        UpdateResponse
            OK

        Examples
        --------
        import asyncio

        from seed import AsyncSeedApi

        client = AsyncSeedApi(
            base_url="https://yourhost.com/path/to/api",
        )


        async def main() -> None:
            await client.dataservice.update(
                id="id",
            )


        asyncio.run(main())
        """
        _response = await self._client_wrapper.httpx_client.request(
            "data/update",
            method="POST",
            json={
                "id": id,
                "values": values,
                "setMetadata": convert_and_respect_annotation_metadata(
                    object_=set_metadata, annotation=Metadata, direction="write"
                ),
                "namespace": namespace,
                "indexedData": convert_and_respect_annotation_metadata(
                    object_=indexed_data, annotation=IndexedData, direction="write"
                ),
            },
            headers={
                "content-type": "application/json",
            },
            request_options=request_options,
            omit=OMIT,
        )
        try:
            if 200 <= _response.status_code < 300:
                return typing.cast(
                    UpdateResponse,
                    parse_obj_as(
                        type_=UpdateResponse,  # type: ignore
                        object_=_response.json(),
                    ),
                )
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)
