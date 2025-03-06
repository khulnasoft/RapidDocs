import abc

import fastapi


class AbstractRapiddocsService(abc.ABC):
    @classmethod
    def _init_rapiddocs(cls, router: fastapi.APIRouter) -> None:
        ...
