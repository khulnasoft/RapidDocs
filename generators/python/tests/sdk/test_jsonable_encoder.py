from typing import List

from rapiddocs.generator_exec.logging import GeneratorUpdate, InitUpdateV2

from core_utilities.shared.jsonable_encoder import jsonable_encoder


def test_jsonable_encoder() -> None:
    updates: List[GeneratorUpdate] = [GeneratorUpdate.factory.init_v_2(InitUpdateV2(publishing_to_registry=None))]
    serialized = jsonable_encoder(updates)
    assert serialized == [{"_type": "initV2", "publishingToRegistry": None}]
