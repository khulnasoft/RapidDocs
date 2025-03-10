# This file was auto-generated by Rapiddocs from our API Definition.

from __future__ import annotations
from ...core.pydantic_utilities import UniversalBaseModel
import typing
import datetime as dt


class UnionWithOptionalTime_Date(UniversalBaseModel):
    value: typing.Optional[dt.date] = None
    type: typing.Literal["date"] = "date"


class UnionWithOptionalTime_Datetime(UniversalBaseModel):
    value: typing.Optional[dt.datetime] = None
    type: typing.Literal["datetime"] = "datetime"


UnionWithOptionalTime = typing.Union[UnionWithOptionalTime_Date, UnionWithOptionalTime_Datetime]
