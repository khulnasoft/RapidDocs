from rapiddocs_python.codegen import AST
from rapiddocs_python.external_dependencies import FastAPI

from ....context import FastApiGeneratorContext
from ..endpoint_parameter import EndpointParameter


class RequestEndpointParameter(EndpointParameter):
    def __init__(self, context: FastApiGeneratorContext):
        super().__init__(context=context)

    def get_name(self) -> str:
        return self._get_request_param_name()

    def _get_unsafe_name(self) -> str:
        return self._get_request_param_name()

    def get_default(self) -> AST.Expression:
        return FastAPI.Body()
