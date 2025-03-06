import { SourceResolverImpl } from "@khulnasoft/cli-source-resolver";
import { AbsoluteFilePath } from "@khulnasoft/fs-utils";
import { generateIntermediateRepresentation } from "@khulnasoft/ir-generator";
import { IntermediateRepresentation } from "@khulnasoft/ir-sdk";
import { createMockTaskContext } from "@khulnasoft/task-context";
import { loadAPIWorkspace } from "@khulnasoft/workspace-loader";

export async function getIrForApi(absolutePathToWorkspace: AbsoluteFilePath): Promise<IntermediateRepresentation> {
    const context = createMockTaskContext();
    const response = await loadAPIWorkspace({
        absolutePathToWorkspace,
        context,
        cliVersion: "0.0.0",
        workspaceName: undefined
    });
    if (!response.didSucceed) {
        return context.failAndThrow("Failed to load workspace", response.failures);
    }
    const rapiddocsWorkspace = await response.workspace.toRapiddocsWorkspace({ context });
    return generateIntermediateRepresentation({
        workspace: rapiddocsWorkspace,
        generationLanguage: undefined,
        audiences: { type: "all" },
        keywords: undefined,
        smartCasing: true, // Verify the special casing convention in tests.
        exampleGeneration: { disabled: false },
        readme: undefined,
        version: undefined,
        packageName: undefined,
        context,
        sourceResolver: new SourceResolverImpl(context, rapiddocsWorkspace)
    });
}
