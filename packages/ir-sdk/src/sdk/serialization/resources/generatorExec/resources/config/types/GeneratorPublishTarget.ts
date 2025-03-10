/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as RapiddocsIr from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { MavenRegistryConfigV2 } from "./MavenRegistryConfigV2";
import { NpmRegistryConfigV2 } from "./NpmRegistryConfigV2";
import { PypiRegistryConfig } from "./PypiRegistryConfig";
import { PostmanConfig } from "./PostmanConfig";
import { RubyGemsRegistryConfig } from "./RubyGemsRegistryConfig";
import { NugetRegistryConfig } from "./NugetRegistryConfig";

export const GeneratorPublishTarget: core.serialization.Schema<
    serializers.generatorExec.GeneratorPublishTarget.Raw,
    RapiddocsIr.generatorExec.GeneratorPublishTarget
> = core.serialization
    .union("type", {
        maven: MavenRegistryConfigV2,
        npm: NpmRegistryConfigV2,
        pypi: PypiRegistryConfig,
        postman: PostmanConfig,
        rubygems: RubyGemsRegistryConfig,
        nuget: NugetRegistryConfig,
    })
    .transform<RapiddocsIr.generatorExec.GeneratorPublishTarget>({
        transform: (value) => {
            switch (value.type) {
                case "maven":
                    return RapiddocsIr.generatorExec.GeneratorPublishTarget.maven(value);
                case "npm":
                    return RapiddocsIr.generatorExec.GeneratorPublishTarget.npm(value);
                case "pypi":
                    return RapiddocsIr.generatorExec.GeneratorPublishTarget.pypi(value);
                case "postman":
                    return RapiddocsIr.generatorExec.GeneratorPublishTarget.postman(value);
                case "rubygems":
                    return RapiddocsIr.generatorExec.GeneratorPublishTarget.rubygems(value);
                case "nuget":
                    return RapiddocsIr.generatorExec.GeneratorPublishTarget.nuget(value);
                default:
                    return value as RapiddocsIr.generatorExec.GeneratorPublishTarget;
            }
        },
        untransform: ({ _visit, ...value }) => value as any,
    });

export declare namespace GeneratorPublishTarget {
    export type Raw =
        | GeneratorPublishTarget.Maven
        | GeneratorPublishTarget.Npm
        | GeneratorPublishTarget.Pypi
        | GeneratorPublishTarget.Postman
        | GeneratorPublishTarget.Rubygems
        | GeneratorPublishTarget.Nuget;

    export interface Maven extends MavenRegistryConfigV2.Raw {
        type: "maven";
    }

    export interface Npm extends NpmRegistryConfigV2.Raw {
        type: "npm";
    }

    export interface Pypi extends PypiRegistryConfig.Raw {
        type: "pypi";
    }

    export interface Postman extends PostmanConfig.Raw {
        type: "postman";
    }

    export interface Rubygems extends RubyGemsRegistryConfig.Raw {
        type: "rubygems";
    }

    export interface Nuget extends NugetRegistryConfig.Raw {
        type: "nuget";
    }
}
