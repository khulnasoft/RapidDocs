# This file was auto-generated by Rapiddocs from our API Definition.

from ....core.abstract_rapiddocs_service import AbstractRapiddocsService
from .find_request import FindRequest
import typing
from ..types.importing_type import ImportingType
import abc
import fastapi
import inspect
from ....core.exceptions.rapiddocs_http_exception import RapiddocsHTTPException
import logging
import functools
from ....core.route_args import get_route_args


class AbstractFooService(AbstractRapiddocsService):
    """
    AbstractFooService is an abstract class containing the methods that you should implement.

    Each method is associated with an API route, which will be registered
    with FastAPI when you register your implementation using Rapiddocs's register()
    function.
    """

    @abc.abstractmethod
    def find(
        self, *, body: FindRequest, optional_string: typing.Optional[str] = None
    ) -> ImportingType: ...

    """
    Below are internal methods used by Rapiddocs to register your implementation.
    You can ignore them.
    """

    @classmethod
    def _init_rapiddocs(cls, router: fastapi.APIRouter) -> None:
        cls.__init_find(router=router)

    @classmethod
    def __init_find(cls, router: fastapi.APIRouter) -> None:
        endpoint_function = inspect.signature(cls.find)
        new_parameters: typing.List[inspect.Parameter] = []
        for index, (parameter_name, parameter) in enumerate(
            endpoint_function.parameters.items()
        ):
            if index == 0:
                new_parameters.append(parameter.replace(default=fastapi.Depends(cls)))
            elif parameter_name == "body":
                new_parameters.append(parameter.replace(default=fastapi.Body(...)))
            elif parameter_name == "optional_string":
                new_parameters.append(
                    parameter.replace(
                        default=fastapi.Query(default=..., alias="optionalString")
                    )
                )
            else:
                new_parameters.append(parameter)
        setattr(
            cls.find,
            "__signature__",
            endpoint_function.replace(parameters=new_parameters),
        )

        @functools.wraps(cls.find)
        def wrapper(*args: typing.Any, **kwargs: typing.Any) -> ImportingType:
            try:
                return cls.find(*args, **kwargs)
            except RapiddocsHTTPException as e:
                logging.getLogger(f"{cls.__module__}.{cls.__name__}").warn(
                    f"Endpoint 'find' unexpectedly threw {e.__class__.__name__}. "
                    + f"If this was intentional, please add {e.__class__.__name__} to "
                    + "the endpoint's errors list in your Rapiddocs Definition."
                )
                raise e

        # this is necessary for FastAPI to find forward-ref'ed type hints.
        # https://github.com/tiangolo/fastapi/pull/5077
        wrapper.__globals__.update(cls.find.__globals__)

        router.post(
            path="/",
            response_model=ImportingType,
            description=AbstractFooService.find.__doc__,
            **get_route_args(cls.find, default_tag="foo"),
        )(wrapper)
