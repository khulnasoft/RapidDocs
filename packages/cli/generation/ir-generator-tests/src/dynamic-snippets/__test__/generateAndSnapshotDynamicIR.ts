import { writeFile } from "fs/promises";

import { SourceResolverImpl } from "@khulnasoft/cli-source-resolver";
import { Audiences } from "@khulnasoft/configuration-loader";
import { AbsoluteFilePath, RelativeFilePath, join, stringifyLargeObject } from "@khulnasoft/fs-utils";
import { convertIrToDynamicSnippetsIr, generateIntermediateRepresentation } from "@khulnasoft/ir-generator";
import { serialization as IrSerialization } from "@khulnasoft/ir-sdk";
import { createMockTaskContext } from "@khulnasoft/task-context";
import { AbstractAPIWorkspace } from "@khulnasoft/workspace-loader";

export async function generateAndSnapshotDynamicIR({
    workspace,
    workspaceName,
    audiences,
    absolutePathToIr
}: {
    workspace: AbstractAPIWorkspace<unknown>;
    workspaceName: string;
    absolutePathToIr: AbsoluteFilePath;
    audiences: Audiences;
}): Promise<void> {
    const context = createMockTaskContext();
    const rapiddocsWorkspace = await workspace.toRapiddocsWorkspace({
        context
    });

    const intermediateRepresentation = generateIntermediateRepresentation({
        workspace: rapiddocsWorkspace,
        generationLanguage: undefined,
        audiences,
        keywords: undefined,
        smartCasing: true,
        exampleGeneration: { disabled: false },
        readme: undefined,
        version: undefined,
        packageName: undefined,
        context,
        sourceResolver: new SourceResolverImpl(context, rapiddocsWorkspace)
    });

    const dynamicIntermediateRepresentation = await convertIrToDynamicSnippetsIr({
        ir: intermediateRepresentation
    });

    const dynamicIntermediateRepresentationJson = IrSerialization.dynamic.DynamicIntermediateRepresentation.jsonOrThrow(
        dynamicIntermediateRepresentation,
        {
            unrecognizedObjectKeys: "strip"
        }
    );

    await writeFile(
        join(AbsoluteFilePath.of(absolutePathToIr), RelativeFilePath.of(`${workspaceName}.json`)),
        await stringifyLargeObject(dynamicIntermediateRepresentationJson, { pretty: true })
    );
}
