# This file was auto-generated by Rapiddocs from our API Definition.

import typing_extensions
import typing_extensions
from .a_nested_literal import ANestedLiteralParams
from ...core.serialization import FieldMetadata


class ATopLevelLiteralParams(typing_extensions.TypedDict):
    nested_literal: typing_extensions.Annotated[ANestedLiteralParams, FieldMetadata(alias="nestedLiteral")]
