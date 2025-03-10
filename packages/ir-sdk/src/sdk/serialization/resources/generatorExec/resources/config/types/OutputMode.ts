/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as RapiddocsIr from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { GeneratorPublishConfig } from "./GeneratorPublishConfig";
import { GithubOutputMode } from "./GithubOutputMode";

export const OutputMode: core.serialization.Schema<
    serializers.generatorExec.OutputMode.Raw,
    RapiddocsIr.generatorExec.OutputMode
> = core.serialization
    .union("type", {
        publish: GeneratorPublishConfig,
        downloadFiles: core.serialization.object({}),
        github: GithubOutputMode,
    })
    .transform<RapiddocsIr.generatorExec.OutputMode>({
        transform: (value) => {
            switch (value.type) {
                case "publish":
                    return RapiddocsIr.generatorExec.OutputMode.publish(value);
                case "downloadFiles":
                    return RapiddocsIr.generatorExec.OutputMode.downloadFiles();
                case "github":
                    return RapiddocsIr.generatorExec.OutputMode.github(value);
                default:
                    return value as RapiddocsIr.generatorExec.OutputMode;
            }
        },
        untransform: ({ _visit, ...value }) => value as any,
    });

export declare namespace OutputMode {
    export type Raw = OutputMode.Publish | OutputMode.DownloadFiles | OutputMode.Github;

    export interface Publish extends GeneratorPublishConfig.Raw {
        type: "publish";
    }

    export interface DownloadFiles {
        type: "downloadFiles";
    }

    export interface Github extends GithubOutputMode.Raw {
        type: "github";
    }
}
