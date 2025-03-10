# This file was auto-generated by Rapiddocs from our API Definition.

from ...core.pydantic_utilities import UniversalBaseModel
import typing_extensions
import typing
from ...core.serialization import FieldMetadata
from .page import Page
import pydantic
from .user import User
from ...core.pydantic_utilities import IS_PYDANTIC_V2


class ListUsersPaginationResponse(UniversalBaseModel):
    has_next_page: typing_extensions.Annotated[typing.Optional[bool], FieldMetadata(alias="hasNextPage")] = None
    page: typing.Optional[Page] = None
    total_count: int = pydantic.Field()
    """
    The totall number of /users
    """

    data: typing.List[User]

    if IS_PYDANTIC_V2:
        model_config: typing.ClassVar[pydantic.ConfigDict] = pydantic.ConfigDict(extra="allow", frozen=True)  # type: ignore # Pydantic v2
    else:

        class Config:
            frozen = True
            smart_union = True
            extra = pydantic.Extra.allow
