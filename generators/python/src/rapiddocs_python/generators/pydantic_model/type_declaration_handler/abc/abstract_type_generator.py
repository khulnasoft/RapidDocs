from abc import ABC, abstractmethod
from typing import Optional

from rapiddocs_python.codegen import SourceFile

from ....context import PydanticGeneratorContext
from ...custom_config import PydanticModelCustomConfig


class AbstractTypeGenerator(ABC):
    def __init__(
        self,
        context: PydanticGeneratorContext,
        source_file: SourceFile,
        custom_config: PydanticModelCustomConfig,
        docs: Optional[str],
        snippet: Optional[str] = None,
    ):
        self._context = context
        self._custom_config = custom_config
        self._source_file = source_file
        self._docs = docs
        self._snippet = snippet

    @abstractmethod
    def generate(self) -> None:
        ...
