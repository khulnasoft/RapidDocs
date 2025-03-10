# This file was auto-generated by Rapiddocs from our API Definition.

from seed import SeedNullable
import os
import pytest
from seed import AsyncSeedNullable


@pytest.fixture
def client() -> SeedNullable:
    return SeedNullable(base_url=os.getenv("TESTS_BASE_URL", "base_url"))


@pytest.fixture
def async_client() -> AsyncSeedNullable:
    return AsyncSeedNullable(base_url=os.getenv("TESTS_BASE_URL", "base_url"))
