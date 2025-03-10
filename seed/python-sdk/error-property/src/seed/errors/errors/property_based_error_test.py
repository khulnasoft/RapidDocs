# This file was auto-generated by Rapiddocs from our API Definition.

from ...core.api_error import ApiError
from ..types.property_based_error_test_body import PropertyBasedErrorTestBody


class PropertyBasedErrorTest(ApiError):
    def __init__(self, body: PropertyBasedErrorTestBody):
        super().__init__(status_code=400, body=body)
