from typing import Optional, Tuple

import rapiddocs.ir.resources as ir_types

from rapiddocs_python.codegen import ExportStrategy, Filepath

from .fastapi_declaration_referencer import FastApiDeclarationReferencer


class ServiceDeclarationReferencer(FastApiDeclarationReferencer[ir_types.http.DeclaredServiceName]):
    def get_filepath(self, *, name: ir_types.DeclaredServiceName, as_request: bool = False) -> Filepath:
        return Filepath(
            directories=self._get_directories_for_service(
                name=name,
                service_directory_export_strategy=None,
            ),
            file=Filepath.FilepathPart(module_name="service"),
        )

    def _get_directories_for_service(
        self,
        *,
        name: ir_types.DeclaredServiceName,
        service_directory_export_strategy: Optional[ExportStrategy],
    ) -> Tuple[Filepath.DirectoryFilepathPart, ...]:
        return (
            *self._get_directories_for_rapiddocs_filepath(
                rapiddocs_filepath=name.rapiddocs_filepath,
            ),
            Filepath.DirectoryFilepathPart(
                module_name="service",
                export_strategy=service_directory_export_strategy,
            ),
        )

    def get_class_name(self, *, name: ir_types.DeclaredServiceName, as_request: bool = False) -> str:
        joined_path = (
            "".join([part.pascal_case.unsafe_name for part in name.rapiddocs_filepath.all_parts])
            if len(name.rapiddocs_filepath.all_parts) > 0
            else "Root"
        )
        return f"Abstract{joined_path}Service"
