import rapiddocs.ir.resources as ir_types

from rapiddocs_python.codegen import AST

from ...auth import SecurityFileGenerator
from .endpoint_parameter import EndpointParameter


class AuthEndpointParameter(EndpointParameter):
    def _get_unsafe_name(self) -> str:
        return "auth"

    def get_type(self) -> AST.TypeHint:
        return SecurityFileGenerator.get_reference_to_parsed_auth(context=self._context)

    def get_default(self) -> AST.Expression:
        return SecurityFileGenerator.get_reference_to_rapiddocs_auth_dependency(context=self._context)

    @staticmethod
    def get_variable_name_of_path_parameter(path_parameter: ir_types.PathParameter) -> str:
        return path_parameter.name.snake_case.safe_name
