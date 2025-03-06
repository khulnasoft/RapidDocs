import os
import subprocess

from rapiddocs.ir import IntermediateRepresentation


def test_ir_deserialization() -> None:
    path_to_ir = os.path.join(os.path.dirname(__file__), "fixtures/rapiddocs/ir.json")
    subprocess.run(
        [
            "npx",
            "--yes",
            "khulnasoft",
            "ir",
            path_to_ir,
            "--language",
            "python",
        ],
        cwd=os.path.join(
            os.path.dirname(__file__),
            "fixtures",
        ),
        check=True,
    )

    IntermediateRepresentation.parse_file(path_to_ir)
