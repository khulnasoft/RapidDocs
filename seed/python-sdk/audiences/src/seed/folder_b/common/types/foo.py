# This file was auto-generated by Rapiddocs from our API Definition.

from ....core.pydantic_utilities import UniversalBaseModel
import typing
from ....folder_c.common.types.folder_c_foo import FolderCFoo
from ....core.pydantic_utilities import IS_PYDANTIC_V2
import pydantic


class Foo(UniversalBaseModel):
    foo: typing.Optional[FolderCFoo] = None

    if IS_PYDANTIC_V2:
        model_config: typing.ClassVar[pydantic.ConfigDict] = pydantic.ConfigDict(extra="allow", frozen=True)  # type: ignore # Pydantic v2
    else:

        class Config:
            frozen = True
            smart_union = True
            extra = pydantic.Extra.allow
