import rapiddocs.ir.resources as ir_types

from rapiddocs_python.codegen import ExportStrategy, Filepath

from .sdk_declaration_referencer import SdkDeclarationReferencer


class ErrorDeclarationReferencer(SdkDeclarationReferencer[ir_types.DeclaredErrorName]):
    def get_filepath(self, *, name: ir_types.DeclaredErrorName, as_request: bool = False) -> Filepath:
        return Filepath(
            directories=self._get_directories_for_rapiddocs_filepath(
                rapiddocs_filepath=name.rapiddocs_filepath,
            )
            + (
                Filepath.DirectoryFilepathPart(
                    module_name="errors",
                    export_strategy=ExportStrategy(export_all=True),
                ),
            ),
            file=Filepath.FilepathPart(module_name=name.name.snake_case.safe_name),
        )

    def get_class_name(self, *, name: ir_types.DeclaredErrorName, as_request: bool = False) -> str:
        return name.name.pascal_case.safe_name
