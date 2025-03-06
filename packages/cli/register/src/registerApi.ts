import { RapiddocsWorkspace } from "@khulnasoft/api-workspace-commons";
import { RapiddocsToken } from "@khulnasoft/auth";
import { SourceResolverImpl } from "@khulnasoft/cli-source-resolver";
import { Audiences } from "@khulnasoft/configuration";
import { createFdrService } from "@khulnasoft/core";
import { generateIntermediateRepresentation } from "@khulnasoft/ir-generator";
import { IntermediateRepresentation } from "@khulnasoft/ir-sdk";
import { TaskContext } from "@khulnasoft/task-context";

import { RapiddocsRegistry as FdrCjsSdk } from "@rapiddocs-rapiddocs/fdr-cjs-sdk";

import { PlaygroundConfig } from "./ir-to-fdr-converter/convertAuth";
import { convertIrToFdrApi } from "./ir-to-fdr-converter/convertIrToFdrApi";

export async function registerApi({
    organization,
    workspace,
    context,
    token,
    audiences,
    snippetsConfig,
    playgroundConfig
}: {
    organization: string;
    workspace: RapiddocsWorkspace;
    context: TaskContext;
    token: RapiddocsToken;
    audiences: Audiences;
    snippetsConfig: FdrCjsSdk.api.v1.register.SnippetsConfig;
    playgroundConfig?: PlaygroundConfig;
}): Promise<{ id: FdrCjsSdk.ApiDefinitionId; ir: IntermediateRepresentation }> {
    const ir = generateIntermediateRepresentation({
        workspace,
        audiences,
        generationLanguage: undefined,
        keywords: undefined,
        smartCasing: false,
        exampleGeneration: { disabled: false },
        readme: undefined,
        version: undefined,
        packageName: undefined,
        context,
        sourceResolver: new SourceResolverImpl(context, workspace)
    });

    const fdrService = createFdrService({
        token: token.value
    });

    const apiDefinition = convertIrToFdrApi({ ir, snippetsConfig, playgroundConfig });
    const response = await fdrService.api.v1.register.registerApiDefinition({
        orgId: FdrCjsSdk.OrgId(organization),
        apiId: FdrCjsSdk.ApiId(ir.apiName.originalName),
        definition: apiDefinition
    });

    if (response.ok) {
        context.logger.debug(`Registered API Definition ${response.body.apiDefinitionId}`);
        return { id: response.body.apiDefinitionId, ir };
    } else {
        switch (response.error.error) {
            case "UnauthorizedError":
            case "UserNotInOrgError": {
                return context.failAndThrow(
                    "You do not have permissions to register the docs. Reach out to support@buildwithrapiddocs.com"
                );
            }
            default:
                return context.failAndThrow("Failed to register API", response.error);
        }
    }
}
