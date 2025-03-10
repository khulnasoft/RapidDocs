# This file was auto-generated by Rapiddocs from our API Definition.

from ..core.abstract_rapiddocs_service import AbstractRapiddocsService
import abc
import fastapi
import inspect
import typing
from ..core.exceptions.rapiddocs_http_exception import RapiddocsHTTPException
import logging
import functools
import starlette
from ..core.route_args import get_route_args


class AbstractRootService(AbstractRapiddocsService):
    """
    AbstractRootService is an abstract class containing the methods that you should implement.

    Each method is associated with an API route, which will be registered
    with FastAPI when you register your implementation using Rapiddocs's register()
    function.
    """

    @abc.abstractmethod
    def get(self, *, type_id: str) -> None: ...

    """
    Below are internal methods used by Rapiddocs to register your implementation.
    You can ignore them.
    """

    @classmethod
    def _init_rapiddocs(cls, router: fastapi.APIRouter) -> None:
        cls.__init_get(router=router)

    @classmethod
    def __init_get(cls, router: fastapi.APIRouter) -> None:
        endpoint_function = inspect.signature(cls.get)
        new_parameters: typing.List[inspect.Parameter] = []
        for index, (parameter_name, parameter) in enumerate(
            endpoint_function.parameters.items()
        ):
            if index == 0:
                new_parameters.append(parameter.replace(default=fastapi.Depends(cls)))
            elif parameter_name == "type_id":
                new_parameters.append(parameter.replace(default=fastapi.Path(...)))
            else:
                new_parameters.append(parameter)
        setattr(
            cls.get,
            "__signature__",
            endpoint_function.replace(parameters=new_parameters),
        )

        @functools.wraps(cls.get)
        def wrapper(*args: typing.Any, **kwargs: typing.Any) -> None:
            try:
                return cls.get(*args, **kwargs)
            except RapiddocsHTTPException as e:
                logging.getLogger(f"{cls.__module__}.{cls.__name__}").warn(
                    f"Endpoint 'get' unexpectedly threw {e.__class__.__name__}. "
                    + f"If this was intentional, please add {e.__class__.__name__} to "
                    + "the endpoint's errors list in your Rapiddocs Definition."
                )
                raise e

        # this is necessary for FastAPI to find forward-ref'ed type hints.
        # https://github.com/tiangolo/fastapi/pull/5077
        wrapper.__globals__.update(cls.get.__globals__)

        router.get(
            path="/{type_id}",
            response_model=None,
            status_code=starlette.status.HTTP_204_NO_CONTENT,
            description=AbstractRootService.get.__doc__,
            **get_route_args(cls.get, default_tag=""),
        )(wrapper)
