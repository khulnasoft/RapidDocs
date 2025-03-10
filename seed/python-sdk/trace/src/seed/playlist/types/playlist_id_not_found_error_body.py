# This file was auto-generated by Rapiddocs from our API Definition.

from __future__ import annotations
from ...core.pydantic_utilities import UniversalBaseModel
from .playlist_id import PlaylistId
import typing
from ...core.pydantic_utilities import IS_PYDANTIC_V2
import pydantic


class PlaylistIdNotFoundErrorBody_PlaylistId(UniversalBaseModel):
    value: PlaylistId
    type: typing.Literal["playlistId"] = "playlistId"

    if IS_PYDANTIC_V2:
        model_config: typing.ClassVar[pydantic.ConfigDict] = pydantic.ConfigDict(frozen=True)  # type: ignore # Pydantic v2
    else:

        class Config:
            frozen = True
            smart_union = True


PlaylistIdNotFoundErrorBody = PlaylistIdNotFoundErrorBody_PlaylistId
