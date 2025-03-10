# This file was auto-generated by Rapiddocs from our API Definition.

import abc
import datetime as dt
import functools
import inspect
import logging
import typing
import uuid

import fastapi

from ....core.abstract_rapiddocs_service import AbstractRapiddocsService
from ....core.exceptions.rapiddocs_http_exception import RapiddocsHTTPException
from ....core.route_args import get_route_args
from ..types.user import User


class AbstractUserService(AbstractRapiddocsService):
    """
    AbstractUserService is an abstract class containing the methods that you should implement.

    Each method is associated with an API route, which will be registered
    with FastAPI when you register your implementation using Rapiddocs's register()
    function.
    """

    @abc.abstractmethod
    def get_username(
        self,
        *,
        limit: int,
        id: uuid.UUID,
        date: dt.date,
        deadline: dt.datetime,
        bytes: str,
        optional_string: typing.Optional[str] = None,
        filter: typing.List[str],
    ) -> User:
        ...

    """
    Below are internal methods used by Rapiddocs to register your implementation.
    You can ignore them.
    """

    @classmethod
    def _init_rapiddocs(cls, router: fastapi.APIRouter) -> None:
        cls.__init_get_username(router=router)

    @classmethod
    def __init_get_username(cls, router: fastapi.APIRouter) -> None:
        endpoint_function = inspect.signature(cls.get_username)
        new_parameters: typing.List[inspect.Parameter] = []
        for index, (parameter_name, parameter) in enumerate(endpoint_function.parameters.items()):
            if index == 0:
                new_parameters.append(parameter.replace(default=fastapi.Depends(cls)))
            elif parameter_name == "limit":
                new_parameters.append(parameter.replace(default=fastapi.Query(default=...)))
            elif parameter_name == "id":
                new_parameters.append(parameter.replace(default=fastapi.Query(default=...)))
            elif parameter_name == "date":
                new_parameters.append(parameter.replace(default=fastapi.Query(default=...)))
            elif parameter_name == "deadline":
                new_parameters.append(parameter.replace(default=fastapi.Query(default=...)))
            elif parameter_name == "bytes":
                new_parameters.append(parameter.replace(default=fastapi.Query(default=...)))
            elif parameter_name == "optional_string":
                new_parameters.append(parameter.replace(default=fastapi.Query(default=None, alias="optionalString")))
            elif parameter_name == "filter":
                new_parameters.append(parameter.replace(default=fastapi.Query(default=[])))
            else:
                new_parameters.append(parameter)
        setattr(cls.get_username, "__signature__", endpoint_function.replace(parameters=new_parameters))

        @functools.wraps(cls.get_username)
        def wrapper(*args: typing.Any, **kwargs: typing.Any) -> User:
            try:
                return cls.get_username(*args, **kwargs)
            except RapiddocsHTTPException as e:
                logging.getLogger(f"{cls.__module__}.{cls.__name__}").warn(
                    f"Endpoint 'get_username' unexpectedly threw {e.__class__.__name__}. "
                    + f"If this was intentional, please add {e.__class__.__name__} to "
                    + "the endpoint's errors list in your Rapiddocs Definition."
                )
                raise e

        # this is necessary for FastAPI to find forward-ref'ed type hints.
        # https://github.com/tiangolo/fastapi/pull/5077
        wrapper.__globals__.update(cls.get_username.__globals__)

        router.get(
            path="/user",
            response_model=User,
            description=AbstractUserService.get_username.__doc__,
            **get_route_args(cls.get_username, default_tag="user"),
        )(wrapper)
