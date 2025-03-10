# This file was auto-generated by Rapiddocs from our API Definition.

from ....core.pydantic_utilities import UniversalBaseModel
import typing
from ....types.metadata import Metadata
from ....core.pydantic_utilities import IS_PYDANTIC_V2
import pydantic


class CreateRequest(UniversalBaseModel):
    username: typing.Optional[str] = None
    email: typing.Optional[str] = None
    age: typing.Optional[int] = None
    weight: typing.Optional[float] = None
    metadata: typing.Optional[Metadata] = None

    if IS_PYDANTIC_V2:
        model_config: typing.ClassVar[pydantic.ConfigDict] = pydantic.ConfigDict(
            extra="forbid"
        )  # type: ignore # Pydantic v2
    else:

        class Config:
            extra = pydantic.Extra.forbid
