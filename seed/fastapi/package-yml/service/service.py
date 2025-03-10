# This file was auto-generated by Rapiddocs from our API Definition.

from ..core.abstract_rapiddocs_service import AbstractRapiddocsService
from ..types.echo_request import EchoRequest
import abc
import fastapi
import inspect
import typing
from ..core.exceptions.rapiddocs_http_exception import RapiddocsHTTPException
import logging
import functools
from ..core.route_args import get_route_args


class AbstractRootService(AbstractRapiddocsService):
    """
    AbstractRootService is an abstract class containing the methods that you should implement.

    Each method is associated with an API route, which will be registered
    with FastAPI when you register your implementation using Rapiddocs's register()
    function.
    """

    @abc.abstractmethod
    def echo(self, *, body: EchoRequest) -> str: ...

    """
    Below are internal methods used by Rapiddocs to register your implementation.
    You can ignore them.
    """

    @classmethod
    def _init_rapiddocs(cls, router: fastapi.APIRouter) -> None:
        cls.__init_echo(router=router)

    @classmethod
    def __init_echo(cls, router: fastapi.APIRouter) -> None:
        endpoint_function = inspect.signature(cls.echo)
        new_parameters: typing.List[inspect.Parameter] = []
        for index, (parameter_name, parameter) in enumerate(
            endpoint_function.parameters.items()
        ):
            if index == 0:
                new_parameters.append(parameter.replace(default=fastapi.Depends(cls)))
            elif parameter_name == "body":
                new_parameters.append(parameter.replace(default=fastapi.Body(...)))
            else:
                new_parameters.append(parameter)
        setattr(
            cls.echo,
            "__signature__",
            endpoint_function.replace(parameters=new_parameters),
        )

        @functools.wraps(cls.echo)
        def wrapper(*args: typing.Any, **kwargs: typing.Any) -> str:
            try:
                return cls.echo(*args, **kwargs)
            except RapiddocsHTTPException as e:
                logging.getLogger(f"{cls.__module__}.{cls.__name__}").warn(
                    f"Endpoint 'echo' unexpectedly threw {e.__class__.__name__}. "
                    + f"If this was intentional, please add {e.__class__.__name__} to "
                    + "the endpoint's errors list in your Rapiddocs Definition."
                )
                raise e

        # this is necessary for FastAPI to find forward-ref'ed type hints.
        # https://github.com/tiangolo/fastapi/pull/5077
        wrapper.__globals__.update(cls.echo.__globals__)

        router.post(
            path="/{id}/",
            response_model=str,
            description=AbstractRootService.echo.__doc__,
            **get_route_args(cls.echo, default_tag=""),
        )(wrapper)
