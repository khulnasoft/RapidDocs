# This file was auto-generated by Rapiddocs from our API Definition.

from ......core.exceptions.rapiddocs_http_exception import RapiddocsHTTPException


class NotFoundError(RapiddocsHTTPException):
    def __init__(self, error: str):
        super().__init__(status_code=404, name="NotFoundError", content=error)
