import rapiddocs.ir.resources as ir_types

from rapiddocs_python.codegen import Filepath

from .sdk_declaration_referencer import SdkDeclarationReferencer


class SubpackageAsyncClientDeclarationReferencer(SdkDeclarationReferencer[ir_types.Subpackage]):
    def get_filepath(self, *, name: ir_types.Subpackage, as_request: bool = False) -> Filepath:
        return Filepath(
            directories=self._get_directories_for_rapiddocs_filepath(
                rapiddocs_filepath=name.rapiddocs_filepath,
            ),
            file=Filepath.FilepathPart(module_name="client"),
        )

    def get_class_name(self, *, name: ir_types.Subpackage, as_request: bool = False) -> str:
        return "Async" + name.name.pascal_case.unsafe_name + "Client"
