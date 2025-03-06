import Ajv from "ajv";
import addFormats from "ajv-formats";
import { describe, expect, it } from "vitest";

import { SourceResolverImpl } from "@khulnasoft/cli-source-resolver";
import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";
import { generateIntermediateRepresentation } from "@khulnasoft/ir-generator";
import { loadApis } from "@khulnasoft/project-loader";
import { createMockTaskContext } from "@khulnasoft/task-context";

import { convertIRtoJsonSchema } from "../convertIRtoJsonSchema";

describe("convertIRtoJsonSchema", async () => {
    const TEST_DEFINITIONS_DIR = join(
        AbsoluteFilePath.of(__dirname),
        RelativeFilePath.of("../../../../../../test-definitions")
    );
    const apiWorkspaces = await loadApis({
        rapiddocsDirectory: join(AbsoluteFilePath.of(TEST_DEFINITIONS_DIR), RelativeFilePath.of("rapiddocs")),
        context: createMockTaskContext(),
        cliVersion: "0.0.0",
        cliName: "rapiddocs",
        commandLineApiWorkspace: undefined,
        defaultToAllApiWorkspaces: true
    });

    const context = createMockTaskContext();

    await Promise.all(
        apiWorkspaces.map(async (workspace) => {
            const rapiddocsWorkspace = await workspace.toRapiddocsWorkspace({
                context
            });

            const intermediateRepresentation = generateIntermediateRepresentation({
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

            for (const [typeId, _] of Object.entries(intermediateRepresentation.types)) {
                it(`${workspace.workspaceName}-${typeId}`, async () => {
                    const jsonschema = convertIRtoJsonSchema({
                        ir: intermediateRepresentation,
                        typeId,
                        context
                    });

                    // Validate the JSON Schema
                    const ajv = addFormats(new Ajv());
                    ajv.compile(jsonschema);

                    const json = JSON.stringify(jsonschema, undefined, 2);
                    // eslint-disable-next-line jest/no-standalone-expect
                    await expect(json).toMatchFileSnapshot(
                        RelativeFilePath.of(
                            `./__snapshots__/${workspace.workspaceName}/${typeId.replaceAll(":", "_")}.json`
                        )
                    );
                });
            }
        })
    );
});
