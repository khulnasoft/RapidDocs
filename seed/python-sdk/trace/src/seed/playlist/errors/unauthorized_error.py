# This file was auto-generated by Rapiddocs from our API Definition.

from ...core.api_error import ApiError


class UnauthorizedError(ApiError):
    def __init__(self) -> None:
        super().__init__(status_code=401)
