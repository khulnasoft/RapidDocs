# This file was auto-generated by Rapiddocs from our API Definition.

from ...core.pydantic_utilities import UniversalBaseModel
import typing_extensions
from .submission_id import SubmissionId
from ...core.serialization import FieldMetadata
from ...commons.types.language import Language
import typing
from .submission_file_info import SubmissionFileInfo
from ...commons.types.problem_id import ProblemId
from ...core.pydantic_utilities import IS_PYDANTIC_V2
import pydantic


class SubmitRequestV2(UniversalBaseModel):
    submission_id: typing_extensions.Annotated[SubmissionId, FieldMetadata(alias="submissionId")]
    language: Language
    submission_files: typing_extensions.Annotated[
        typing.List[SubmissionFileInfo], FieldMetadata(alias="submissionFiles")
    ]
    problem_id: typing_extensions.Annotated[ProblemId, FieldMetadata(alias="problemId")]
    problem_version: typing_extensions.Annotated[typing.Optional[int], FieldMetadata(alias="problemVersion")] = None
    user_id: typing_extensions.Annotated[typing.Optional[str], FieldMetadata(alias="userId")] = None

    if IS_PYDANTIC_V2:
        model_config: typing.ClassVar[pydantic.ConfigDict] = pydantic.ConfigDict(extra="allow", frozen=True)  # type: ignore # Pydantic v2
    else:

        class Config:
            frozen = True
            smart_union = True
            extra = pydantic.Extra.allow
