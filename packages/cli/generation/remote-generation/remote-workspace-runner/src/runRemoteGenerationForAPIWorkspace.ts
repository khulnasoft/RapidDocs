import { RapiddocsToken } from "@khulnasoft/auth";
import { rapiddocsConfigJson, generatorsYml } from "@khulnasoft/configuration";
import { AbsoluteFilePath } from "@khulnasoft/fs-utils";
import { TaskContext } from "@khulnasoft/task-context";
import {
    AbstractAPIWorkspace,
    getBaseOpenAPIWorkspaceSettingsFromGeneratorInvocation
} from "@khulnasoft/workspace-loader";

import { RapiddocsFiddle } from "@rapiddocs-rapiddocs/fiddle-sdk";

import { downloadSnippetsForTask } from "./downloadSnippetsForTask";
import { runRemoteGenerationForGenerator } from "./runRemoteGenerationForGenerator";

export interface RemoteGenerationForAPIWorkspaceResponse {
    snippetsProducedBy: generatorsYml.GeneratorInvocation[];
}

export async function runRemoteGenerationForAPIWorkspace({
    projectConfig,
    organization,
    workspace,
    context,
    generatorGroup,
    version,
    shouldLogS3Url,
    token,
    whitelabel,
    absolutePathToPreview,
    mode
}: {
    projectConfig: rapiddocsConfigJson.ProjectConfig;
    organization: string;
    workspace: AbstractAPIWorkspace<unknown>;
    context: TaskContext;
    generatorGroup: generatorsYml.GeneratorGroup;
    version: string | undefined;
    shouldLogS3Url: boolean;
    token: RapiddocsToken;
    whitelabel: RapiddocsFiddle.WhitelabelConfig | undefined;
    absolutePathToPreview: AbsoluteFilePath | undefined;
    mode: "pull-request" | undefined;
}): Promise<RemoteGenerationForAPIWorkspaceResponse | null> {
    if (generatorGroup.generators.length === 0) {
        context.logger.warn("No generators specified.");
        return null;
    }

    const interactiveTasks: Promise<boolean>[] = [];
    const snippetsProducedBy: generatorsYml.GeneratorInvocation[] = [];

    interactiveTasks.push(
        ...generatorGroup.generators.map((generatorInvocation) =>
            context.runInteractiveTask({ name: generatorInvocation.name }, async (interactiveTaskContext) => {
                const rapiddocsWorkspace = await workspace.toRapiddocsWorkspace(
                    { context },
                    getBaseOpenAPIWorkspaceSettingsFromGeneratorInvocation(generatorInvocation)
                );

                const remoteTaskHandlerResponse = await runRemoteGenerationForGenerator({
                    projectConfig,
                    organization,
                    workspace: rapiddocsWorkspace,
                    interactiveTaskContext,
                    generatorInvocation: {
                        ...generatorInvocation,
                        outputMode: generatorInvocation.outputMode._visit<RapiddocsFiddle.OutputMode>({
                            downloadFiles: () => generatorInvocation.outputMode,
                            github: (val) => {
                                return RapiddocsFiddle.OutputMode.github({
                                    ...val,
                                    makePr: mode === "pull-request"
                                });
                            },
                            githubV2: (val) => {
                                if (mode === "pull-request") {
                                    return RapiddocsFiddle.OutputMode.githubV2(
                                        RapiddocsFiddle.GithubOutputModeV2.pullRequest(val)
                                    );
                                }
                                return generatorInvocation.outputMode;
                            },
                            publish: () => generatorInvocation.outputMode,
                            publishV2: () => generatorInvocation.outputMode,
                            _other: () => generatorInvocation.outputMode
                        })
                    },
                    version,
                    audiences: generatorGroup.audiences,
                    shouldLogS3Url,
                    token,
                    whitelabel,
                    readme: generatorInvocation.readme,
                    irVersionOverride: generatorInvocation.irVersionOverride,
                    absolutePathToPreview
                });
                if (remoteTaskHandlerResponse != null && remoteTaskHandlerResponse.createdSnippets) {
                    snippetsProducedBy.push(generatorInvocation);

                    if (
                        generatorInvocation.absolutePathToLocalSnippets != null &&
                        remoteTaskHandlerResponse.snippetsS3PreSignedReadUrl != null
                    ) {
                        await downloadSnippetsForTask({
                            snippetsS3PreSignedReadUrl: remoteTaskHandlerResponse.snippetsS3PreSignedReadUrl,
                            absolutePathToLocalSnippetJSON: generatorInvocation.absolutePathToLocalSnippets,
                            context: interactiveTaskContext
                        });
                    }
                }
            })
        )
    );

    const results = await Promise.all(interactiveTasks);
    if (results.some((didSucceed) => !didSucceed)) {
        context.failAndThrow();
    }

    return {
        snippetsProducedBy
    };
}
