/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsIr from "../../../../api/index";
import * as core from "../../../../core";
import { Name } from "../../commons/types/Name";
import { EnvironmentVariable } from "./EnvironmentVariable";
import { WithDocs } from "../../commons/types/WithDocs";

export const BasicAuthScheme: core.serialization.ObjectSchema<serializers.BasicAuthScheme.Raw, RapiddocsIr.BasicAuthScheme> =
    core.serialization
        .objectWithoutOptionalProperties({
            username: Name,
            usernameEnvVar: EnvironmentVariable.optional(),
            password: Name,
            passwordEnvVar: EnvironmentVariable.optional(),
        })
        .extend(WithDocs);

export declare namespace BasicAuthScheme {
    export interface Raw extends WithDocs.Raw {
        username: Name.Raw;
        usernameEnvVar?: EnvironmentVariable.Raw | null;
        password: Name.Raw;
        passwordEnvVar?: EnvironmentVariable.Raw | null;
    }
}
