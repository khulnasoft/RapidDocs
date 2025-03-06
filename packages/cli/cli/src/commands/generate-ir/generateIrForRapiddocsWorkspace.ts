import { RapiddocsWorkspace } from "@khulnasoft/api-workspace-commons";
import { SourceResolverImpl } from "@khulnasoft/cli-source-resolver";
import { Audiences, generatorsYml } from "@khulnasoft/configuration-loader";
import { generateIntermediateRepresentation } from "@khulnasoft/ir-generator";
import { IntermediateRepresentation } from "@khulnasoft/ir-sdk";
import { OSSWorkspace } from "@khulnasoft/lazy-rapiddocs-workspace";
import { TaskContext } from "@khulnasoft/task-context";

import { validateAPIWorkspaceAndLogIssues } from "../validate/validateAPIWorkspaceAndLogIssues";

export async function generateIrForRapiddocsWorkspace({
    workspace,
    context,
    generationLanguage,
    keywords,
    smartCasing,
    disableExamples,
    audiences,
    readme,
    includeDynamicExamples
}: {
    workspace: RapiddocsWorkspace;
    context: TaskContext;
    generationLanguage: generatorsYml.GenerationLanguage | undefined;
    keywords: string[] | undefined;
    smartCasing: boolean;
    disableExamples: boolean;
    audiences: Audiences;
    readme: generatorsYml.ReadmeSchema | undefined;
    includeDynamicExamples: boolean;
}): Promise<IntermediateRepresentation> {
    await validateAPIWorkspaceAndLogIssues({ workspace, context, logWarnings: false });
    return generateIntermediateRepresentation({
        workspace,
        generationLanguage,
        keywords,
        smartCasing,
        exampleGeneration: { disabled: disableExamples },
        audiences,
        readme,
        version: undefined,
        packageName: undefined,
        context,
        sourceResolver: new SourceResolverImpl(context, workspace),
        includeDynamicExamples
    });
}
