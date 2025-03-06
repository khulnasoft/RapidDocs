from abc import ABC, abstractmethod
from typing import Callable, Generic, Optional, Tuple, TypeVar

import rapiddocs.ir.resources as ir_types

from rapiddocs_python.codegen import AST, ExportStrategy, Filepath

T = TypeVar("T")


class AbstractDeclarationReferencer(ABC, Generic[T]):
    def get_class_reference(
        self,
        *,
        name: T,
        as_request: bool,
        must_import_after_current_declaration: Optional[Callable[[T], bool]] = None,
        as_if_type_checking_import: bool = False,
    ) -> AST.ClassReference:
        filepath = self.get_filepath(name=name, as_request=as_request)
        return AST.ClassReference(
            import_=AST.ReferenceImport(
                module=filepath.to_module(),
                named_import=self.get_class_name(name=name, as_request=as_request),
            ),
            qualified_name_excluding_import=(),
            must_import_after_current_declaration=must_import_after_current_declaration(name)
            if must_import_after_current_declaration is not None
            else False,
            import_if_type_checking=as_if_type_checking_import,
        )

    @abstractmethod
    def get_filepath(self, *, name: T, as_request: bool) -> Filepath:
        ...

    @abstractmethod
    def get_class_name(self, *, name: T, as_request: bool) -> str:
        ...

    def _get_directories_for_rapiddocs_filepath(
        self,
        *,
        rapiddocs_filepath: ir_types.RapiddocsFilepath,
    ) -> Tuple[Filepath.DirectoryFilepathPart, ...]:
        parts: Tuple[Filepath.DirectoryFilepathPart, ...] = ()
        for rapiddocs_filepath_part in rapiddocs_filepath.package_path:
            parts += self._get_directories_for_rapiddocs_filepath_part(
                rapiddocs_filepath_part=rapiddocs_filepath_part,
                export_strategy=ExportStrategy(export_as_namespace=True),
            )
        if rapiddocs_filepath.file is not None:
            parts += self._get_directories_for_rapiddocs_filepath_part(
                rapiddocs_filepath_part=rapiddocs_filepath.file,
                export_strategy=ExportStrategy(export_as_namespace=True, export_all=True),
            )
        return parts

    def _get_directories_for_rapiddocs_filepath_part(
        self,
        *,
        rapiddocs_filepath_part: ir_types.Name,
        export_strategy: ExportStrategy,
    ) -> Tuple[Filepath.DirectoryFilepathPart, ...]:
        return (
            Filepath.DirectoryFilepathPart(
                module_name=rapiddocs_filepath_part.snake_case.safe_name,
                export_strategy=export_strategy,
            ),
        )
