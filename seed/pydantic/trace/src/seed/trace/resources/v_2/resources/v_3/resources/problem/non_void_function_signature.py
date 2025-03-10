# This file was auto-generated by Rapiddocs from our API Definition.

from __future__ import annotations
from .......core.pydantic_utilities import UniversalBaseModel
from ......commons.list_type import ListType
from ......commons.map_type import MapType
import typing
from .parameter import Parameter
from ......commons.variable_type import VariableType
import pydantic
from .......core.pydantic_utilities import IS_PYDANTIC_V2
from .......core.pydantic_utilities import update_forward_refs


class NonVoidFunctionSignature(UniversalBaseModel):
    parameters: typing.List[Parameter]
    return_type: VariableType = pydantic.Field(alias="returnType")

    if IS_PYDANTIC_V2:
        model_config: typing.ClassVar[pydantic.ConfigDict] = pydantic.ConfigDict(extra="allow")  # type: ignore # Pydantic v2
    else:

        class Config:
            extra = pydantic.Extra.allow


update_forward_refs(ListType, NonVoidFunctionSignature=NonVoidFunctionSignature)
update_forward_refs(MapType, NonVoidFunctionSignature=NonVoidFunctionSignature)
