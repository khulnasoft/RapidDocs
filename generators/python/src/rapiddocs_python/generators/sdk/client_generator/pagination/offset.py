from typing import Optional

import rapiddocs.ir.resources as ir_types

from rapiddocs_python.codegen import AST
from rapiddocs_python.generators.sdk.client_generator.request_properties import (
    request_property_to_name,
)
from rapiddocs_python.generators.sdk.context.sdk_generator_context import SdkGeneratorContext

from .abstract_paginator import PaginationSnippetConfig, Paginator


class OffsetPagination(Paginator):
    def __init__(
        self,
        *,
        context: SdkGeneratorContext,
        is_async: bool,
        pydantic_parse_expression: AST.Expression,
        config: PaginationSnippetConfig,
        offset: ir_types.OffsetPagination,
    ):
        super().__init__(context, is_async, pydantic_parse_expression, config)
        self.offset = offset

    def init_custom_vars_pre_next(self, *, writer: AST.NodeWriter) -> None:
        return

    def init_custom_vars_after_next(self, *, writer: AST.NodeWriter) -> None:
        return

    def get_next_none_safe_condition(self) -> Optional[str]:
        return None

    def init_has_next(self) -> str:
        return "True"

    def init_get_next(self, *, writer: AST.NodeWriter) -> None:
        writer.write("lambda: ")
        page_parameter_name = request_property_to_name(self.offset.page.property)
        writer.write(f"self.{self._config.endpoint_name}(")
        for parameter in self._config.parameters:
            # Assume the paging mechanism is a direct parameter (e.g. not nested)
            if parameter.name == page_parameter_name:
                # Assume the offset parameter is an integer
                writer.write(f"{parameter.name} + {self.get_step()}")
            elif parameter.name == page_parameter_name:
                # Assume the offset parameter is an integer
                writer.write(f"{parameter.name} + {self.get_step()}")
            else:
                writer.write(parameter.name)
            writer.write(", ")

        for parameter in self._config.named_parameters:
            if parameter.name == page_parameter_name:
                # Here we assume the offset parameter is an integer
                writer.write(f"{parameter.name}={parameter.name} + {self.get_step()}")
            else:
                writer.write(f"{parameter.name}={parameter.name}")
            writer.write(", ")
        writer.write_line(")")

    def get_step(self) -> str:
        return "1"

    def get_results_property(self) -> ir_types.ResponseProperty:
        return self.offset.results
