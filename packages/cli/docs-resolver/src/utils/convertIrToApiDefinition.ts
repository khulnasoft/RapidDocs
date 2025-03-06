import { APIV1Read, SDKSnippetHolder, convertAPIDefinitionToDb, convertDbAPIDefinitionToRead } from "@khulnasoft/fdr-sdk";
import { IntermediateRepresentation } from "@khulnasoft/ir-sdk";
import { convertIrToFdrApi } from "@khulnasoft/register";

import { PlaygroundConfig } from "../DocsDefinitionResolver";

const EMPTY_SNIPPET_HOLDER = new SDKSnippetHolder({
    snippetsBySdkId: {},
    snippetsConfigWithSdkId: {},
    snippetTemplatesByEndpoint: {},
    snippetsBySdkIdAndEndpointId: {},
    snippetTemplatesByEndpointId: {}
});

export function convertIrToApiDefinition(
    ir: IntermediateRepresentation,
    apiDefinitionId: string,
    playgroundConfig?: PlaygroundConfig
): APIV1Read.ApiDefinition {
    // the navigation constructor doesn't need to know about snippets, so we can pass an empty object
    return convertDbAPIDefinitionToRead(
        convertAPIDefinitionToDb(
            convertIrToFdrApi({
                ir,
                snippetsConfig: {
                    typescriptSdk: undefined,
                    pythonSdk: undefined,
                    javaSdk: undefined,
                    rubySdk: undefined,
                    goSdk: undefined,
                    csharpSdk: undefined
                },
                playgroundConfig
            }),
            APIV1Read.ApiDefinitionId(apiDefinitionId),
            EMPTY_SNIPPET_HOLDER
        )
    );
}
