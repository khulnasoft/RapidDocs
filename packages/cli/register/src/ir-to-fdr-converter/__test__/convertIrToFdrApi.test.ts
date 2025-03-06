/* eslint-disable jest/valid-describe-callback */
/* eslint-disable jest/valid-title */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { readdir } from "fs/promises";
import path from "path";

import { SourceResolverImpl } from "@khulnasoft/cli-source-resolver";
import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";
import { generateIntermediateRepresentation } from "@khulnasoft/ir-generator";
import { loadApis } from "@khulnasoft/project-loader";
import { createMockTaskContext } from "@khulnasoft/task-context";

import { convertIrToFdrApi } from "../convertIrToFdrApi";

describe("fdr", async () => {
    const TEST_DEFINITIONS_DIR = path.join(__dirname, "../../../../../../test-definitions");
    const FIXTURES_DIR = path.join(__dirname, "./fixtures");
    const apiWorkspaces = [
        ...(await loadApis({
            rapiddocsDirectory: join(AbsoluteFilePath.of(TEST_DEFINITIONS_DIR), RelativeFilePath.of("rapiddocs")),
            context: createMockTaskContext(),
            cliVersion: "0.0.0",
            cliName: "rapiddocs",
            commandLineApiWorkspace: undefined,
            defaultToAllApiWorkspaces: true
        })),
        ...(
            await Promise.all(
                (await readdir(FIXTURES_DIR, { withFileTypes: true }))
                    .filter((fixture) => fixture.isDirectory())
                    .flatMap(async (fixture) => {
                        return await loadApis({
                            rapiddocsDirectory: join(
                                AbsoluteFilePath.of(FIXTURES_DIR),
                                RelativeFilePath.of(fixture.name),
                                RelativeFilePath.of("rapiddocs")
                            ),
                            context: createMockTaskContext(),
                            cliVersion: "0.0.0",
                            cliName: "rapiddocs",
                            commandLineApiWorkspace: undefined,
                            defaultToAllApiWorkspaces: true
                        });
                    })
            )
        ).flat()
    ];

    await Promise.all(
        apiWorkspaces.map(async (workspace) => {
            const context = createMockTaskContext();
            const rapiddocsWorkspace = await workspace.toRapiddocsWorkspace({
                context
            });

            const ir = generateIntermediateRepresentation({
                workspace: rapiddocsWorkspace,
                generationLanguage: undefined,
                audiences: { type: "all" },
                keywords: undefined,
                smartCasing: true,
                exampleGeneration: { disabled: false },
                readme: undefined,
                version: undefined,
                packageName: undefined,
                context,
                sourceResolver: new SourceResolverImpl(context, rapiddocsWorkspace)
            });

            const fdr = convertIrToFdrApi({
                ir,
                snippetsConfig: {
                    typescriptSdk: undefined,
                    pythonSdk: undefined,
                    javaSdk: undefined,
                    rubySdk: undefined,
                    goSdk: undefined,
                    csharpSdk: undefined
                },
                playgroundConfig: {
                    oauth: true
                }
            });

            it(workspace.workspaceName ?? "", () => {
                expect(JSON.stringify(fdr, undefined, 2)).toMatchFileSnapshot(
                    `./__snapshots__/${
                        workspace.workspaceName ?? workspace.absoluteFilePath.split("/").reverse()[1]
                    }.json`
                );
            });
        })
    );
});
