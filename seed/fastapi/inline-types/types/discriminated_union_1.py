# This file was auto-generated by Rapiddocs from our API Definition.

from __future__ import annotations
from .discriminated_union_1_inline_type_1 import DiscriminatedUnion1InlineType1
from ..core.pydantic_utilities import IS_PYDANTIC_V2
from .discriminated_union_1_inline_type_2 import DiscriminatedUnion1InlineType2
from .reference_type import ReferenceType
from ..core.pydantic_utilities import UniversalRootModel
import typing
import typing_extensions
import pydantic
from ..core.pydantic_utilities import update_forward_refs

T_Result = typing.TypeVar("T_Result")


class _Factory:
    def type_1(self, value: DiscriminatedUnion1InlineType1) -> DiscriminatedUnion1:
        if IS_PYDANTIC_V2:
            return DiscriminatedUnion1(
                root=_DiscriminatedUnion1.Type1(
                    **value.dict(exclude_unset=True), type="type1"
                )
            )  # type: ignore
        else:
            return DiscriminatedUnion1(
                __root__=_DiscriminatedUnion1.Type1(
                    **value.dict(exclude_unset=True), type="type1"
                )
            )  # type: ignore

    def type_2(self, value: DiscriminatedUnion1InlineType2) -> DiscriminatedUnion1:
        if IS_PYDANTIC_V2:
            return DiscriminatedUnion1(
                root=_DiscriminatedUnion1.Type2(
                    **value.dict(exclude_unset=True), type="type2"
                )
            )  # type: ignore
        else:
            return DiscriminatedUnion1(
                __root__=_DiscriminatedUnion1.Type2(
                    **value.dict(exclude_unset=True), type="type2"
                )
            )  # type: ignore

    def ref(self, value: ReferenceType) -> DiscriminatedUnion1:
        if IS_PYDANTIC_V2:
            return DiscriminatedUnion1(
                root=_DiscriminatedUnion1.Ref(
                    **value.dict(exclude_unset=True), type="ref"
                )
            )  # type: ignore
        else:
            return DiscriminatedUnion1(
                __root__=_DiscriminatedUnion1.Ref(
                    **value.dict(exclude_unset=True), type="ref"
                )
            )  # type: ignore


class DiscriminatedUnion1(UniversalRootModel):
    """
    lorem ipsum
    """

    factory: typing.ClassVar[_Factory] = _Factory()

    if IS_PYDANTIC_V2:
        root: typing_extensions.Annotated[
            typing.Union[
                _DiscriminatedUnion1.Type1,
                _DiscriminatedUnion1.Type2,
                _DiscriminatedUnion1.Ref,
            ],
            pydantic.Field(discriminator="type"),
        ]

        def get_as_union(
            self,
        ) -> typing.Union[
            _DiscriminatedUnion1.Type1,
            _DiscriminatedUnion1.Type2,
            _DiscriminatedUnion1.Ref,
        ]:
            return self.root
    else:
        __root__: typing_extensions.Annotated[
            typing.Union[
                _DiscriminatedUnion1.Type1,
                _DiscriminatedUnion1.Type2,
                _DiscriminatedUnion1.Ref,
            ],
            pydantic.Field(discriminator="type"),
        ]

        def get_as_union(
            self,
        ) -> typing.Union[
            _DiscriminatedUnion1.Type1,
            _DiscriminatedUnion1.Type2,
            _DiscriminatedUnion1.Ref,
        ]:
            return self.__root__

    def dict(self, **kwargs: typing.Any) -> typing.Dict[str, typing.Any]:
        if IS_PYDANTIC_V2:
            return self.root.dict(**kwargs)
        else:
            return self.__root__.dict(**kwargs)

    def visit(
        self,
        type_1: typing.Callable[[DiscriminatedUnion1InlineType1], T_Result],
        type_2: typing.Callable[[DiscriminatedUnion1InlineType2], T_Result],
        ref: typing.Callable[[ReferenceType], T_Result],
    ) -> T_Result:
        unioned_value = self.get_as_union()
        if unioned_value.type == "type1":
            return type_1(
                DiscriminatedUnion1InlineType1(
                    **unioned_value.dict(exclude_unset=True, exclude={"type"})
                )
            )
        if unioned_value.type == "type2":
            return type_2(
                DiscriminatedUnion1InlineType2(
                    **unioned_value.dict(exclude_unset=True, exclude={"type"})
                )
            )
        if unioned_value.type == "ref":
            return ref(
                ReferenceType(
                    **unioned_value.dict(exclude_unset=True, exclude={"type"})
                )
            )


class _DiscriminatedUnion1:
    class Type1(DiscriminatedUnion1InlineType1):
        type: typing.Literal["type1"] = "type1"

    class Type2(DiscriminatedUnion1InlineType2):
        type: typing.Literal["type2"] = "type2"

    class Ref(ReferenceType):
        type: typing.Literal["ref"] = "ref"


update_forward_refs(DiscriminatedUnion1)
