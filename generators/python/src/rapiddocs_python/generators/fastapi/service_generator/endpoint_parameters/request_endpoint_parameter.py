import rapiddocs.ir.resources as ir_types

from rapiddocs_python.codegen import AST
from rapiddocs_python.external_dependencies import FastAPI

from ...context import FastApiGeneratorContext
from .endpoint_parameter import EndpointParameter


class RequestEndpointParameter(EndpointParameter):
    def __init__(self, context: FastApiGeneratorContext, request_type: ir_types.TypeReference):
        super().__init__(context=context)
        self._request_type = request_type

    def get_name(self) -> str:
        return self._get_request_param_name()

    def _get_unsafe_name(self) -> str:
        return self._get_request_param_name()

    def get_type(self) -> AST.TypeHint:
        return self._context.pydantic_generator_context.get_type_hint_for_type_reference(self._request_type)

    def get_default(self) -> AST.Expression:
        return FastAPI.Body()
