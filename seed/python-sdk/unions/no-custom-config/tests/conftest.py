# This file was auto-generated by Rapiddocs from our API Definition.

from seed import SeedUnions
import os
import pytest
from seed import AsyncSeedUnions


@pytest.fixture
def client() -> SeedUnions:
    return SeedUnions(base_url=os.getenv("TESTS_BASE_URL", "base_url"))


@pytest.fixture
def async_client() -> AsyncSeedUnions:
    return AsyncSeedUnions(base_url=os.getenv("TESTS_BASE_URL", "base_url"))
