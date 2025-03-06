from typing import List, Literal, Optional, Union

import pydantic
from rapiddocs_python.generators.pydantic_model.custom_config import (
    BasePydanticModelCustomConfig,
    EnumTypes,
)


class FastApiPydanticModelCustomConfig(BasePydanticModelCustomConfig):
    extra_fields: Optional[Literal["allow", "forbid"]] = "forbid"
    use_str_enums: bool = False
    enum_type: EnumTypes = "python_enums"


class FastAPICustomConfig(pydantic.BaseModel):
    include_validators: bool = False
    skip_formatting: bool = False
    async_handlers: Union[bool, List[str]] = False
    pydantic_config: FastApiPydanticModelCustomConfig = FastApiPydanticModelCustomConfig()

    class Config:
        extra = pydantic.Extra.forbid
