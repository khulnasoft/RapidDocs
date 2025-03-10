# This file was auto-generated by Rapiddocs from our API Definition.

from ....core.pydantic_utilities import UniversalBaseModel
import typing
import pydantic
from ....types.metadata import Metadata
from ....types.query_column import QueryColumn
from ....types.indexed_data import IndexedData
from ....core.pydantic_utilities import IS_PYDANTIC_V2


class QueryRequest(UniversalBaseModel):
    namespace: typing.Optional[str] = None
    top_k: int = pydantic.Field(alias="topK")
    filter: typing.Optional[Metadata] = None
    include_values: typing.Optional[bool] = pydantic.Field(
        alias="includeValues", default=None
    )
    include_metadata: typing.Optional[bool] = pydantic.Field(
        alias="includeMetadata", default=None
    )
    queries: typing.Optional[typing.List[QueryColumn]] = None
    column: typing.Optional[typing.List[float]] = None
    id: typing.Optional[str] = None
    indexed_data: typing.Optional[IndexedData] = pydantic.Field(
        alias="indexedData", default=None
    )

    if IS_PYDANTIC_V2:
        model_config: typing.ClassVar[pydantic.ConfigDict] = pydantic.ConfigDict(
            extra="forbid"
        )  # type: ignore # Pydantic v2
    else:

        class Config:
            extra = pydantic.Extra.forbid
