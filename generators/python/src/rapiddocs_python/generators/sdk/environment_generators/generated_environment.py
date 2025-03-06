from dataclasses import dataclass

from rapiddocs_python.codegen import AST


@dataclass
class GeneratedEnvironment:
    class_reference: AST.ClassReference
    example_environment: str  # e.g. PRODUCTION in AcmeEnvironment.PRODUCTION
