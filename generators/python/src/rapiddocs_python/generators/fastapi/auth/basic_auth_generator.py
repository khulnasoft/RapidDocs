from rapiddocs_python.codegen import AST
from rapiddocs_python.external_dependencies import FastAPI

from .abstract_auth_generator import AbstractAuthGenerator


class BasicAuthGenerator(AbstractAuthGenerator):
    def get_dependency(self) -> AST.Expression:
        return AST.Expression(AST.FunctionInvocation(function_definition=FastAPI.HTTPBasic))

    def get_parsed_auth_type(self) -> AST.TypeHint:
        return AST.TypeHint(type=FastAPI.HTTPBasicCredentials)
