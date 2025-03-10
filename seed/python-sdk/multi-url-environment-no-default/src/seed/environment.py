# This file was auto-generated by Rapiddocs from our API Definition.

from __future__ import annotations


class SeedMultiUrlEnvironmentNoDefaultEnvironment:
    PRODUCTION: SeedMultiUrlEnvironmentNoDefaultEnvironment
    STAGING: SeedMultiUrlEnvironmentNoDefaultEnvironment

    def __init__(self, *, ec_2: str, s_3: str):
        self.ec_2 = ec_2
        self.s_3 = s_3


SeedMultiUrlEnvironmentNoDefaultEnvironment.PRODUCTION = SeedMultiUrlEnvironmentNoDefaultEnvironment(
    ec_2="https://ec2.aws.com", s_3="https://s3.aws.com"
)
SeedMultiUrlEnvironmentNoDefaultEnvironment.STAGING = SeedMultiUrlEnvironmentNoDefaultEnvironment(
    ec_2="https://staging.ec2.aws.com", s_3="https://staging.s3.aws.com"
)
