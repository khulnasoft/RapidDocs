from typing import Generic, Tuple, TypeVar

import rapiddocs.ir.resources as ir_types

from rapiddocs_python.codegen import ExportStrategy, Filepath
from rapiddocs_python.declaration_referencer import AbstractDeclarationReferencer

T = TypeVar("T")


class SdkDeclarationReferencer(AbstractDeclarationReferencer[T], Generic[T]):
    def __init__(self, *, skip_resources_module: bool) -> None:
        self.skip_resources_module = skip_resources_module

    def _get_directories_for_rapiddocs_filepath_part(
        self,
        *,
        rapiddocs_filepath_part: ir_types.Name,
        export_strategy: ExportStrategy,
    ) -> Tuple[Filepath.DirectoryFilepathPart, ...]:
        if self.skip_resources_module:
            return (
                Filepath.DirectoryFilepathPart(
                    module_name=rapiddocs_filepath_part.snake_case.safe_name,
                    export_strategy=export_strategy,
                ),
            )
        return (
            Filepath.DirectoryFilepathPart(
                module_name="resources",
                export_strategy=ExportStrategy(export_all=True),
            ),
            Filepath.DirectoryFilepathPart(
                module_name=rapiddocs_filepath_part.snake_case.safe_name,
                export_strategy=export_strategy,
            ),
        )
