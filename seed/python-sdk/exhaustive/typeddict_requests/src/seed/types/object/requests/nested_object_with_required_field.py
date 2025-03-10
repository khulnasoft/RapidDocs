# This file was auto-generated by Rapiddocs from our API Definition.

import typing_extensions

from ....core.serialization import FieldMetadata
from .object_with_optional_field import ObjectWithOptionalFieldParams


class NestedObjectWithRequiredFieldParams(typing_extensions.TypedDict):
    string: str
    nested_object: typing_extensions.Annotated[ObjectWithOptionalFieldParams, FieldMetadata(alias="NestedObject")]
