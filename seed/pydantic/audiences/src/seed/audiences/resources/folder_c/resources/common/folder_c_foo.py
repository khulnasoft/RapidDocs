# This file was auto-generated by Rapiddocs from our API Definition.

from .....core.pydantic_utilities import UniversalBaseModel
import uuid
from .....core.pydantic_utilities import IS_PYDANTIC_V2
import typing
import pydantic


class FolderCFoo(UniversalBaseModel):
    bar_property: uuid.UUID

    if IS_PYDANTIC_V2:
        model_config: typing.ClassVar[pydantic.ConfigDict] = pydantic.ConfigDict(extra="allow")  # type: ignore # Pydantic v2
    else:

        class Config:
            extra = pydantic.Extra.allow
