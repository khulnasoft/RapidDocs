# This file was auto-generated by Rapiddocs from our API Definition.

from __future__ import annotations

import typing

import typing_extensions

from .cat import Cat
from .dog import Dog


class Animal_Dog(Dog):
    animal: typing_extensions.Literal["dog"]

    class Config:
        allow_population_by_field_name = True


class Animal_Cat(Cat):
    animal: typing_extensions.Literal["cat"]

    class Config:
        allow_population_by_field_name = True


Animal = typing.Union[Animal_Dog, Animal_Cat]
