import { SourceResolverImpl } from "@khulnasoft/cli-source-resolver";
import { parseDocsConfiguration } from "@khulnasoft/configuration-loader";
import { RapiddocsNavigation } from "@khulnasoft/fdr-sdk";
import { AbsoluteFilePath, resolve } from "@khulnasoft/fs-utils";
import { generateIntermediateRepresentation } from "@khulnasoft/ir-generator";
import { createMockTaskContext } from "@khulnasoft/task-context";
import { loadAPIWorkspace, loadDocsWorkspace } from "@khulnasoft/workspace-loader";

import { ApiDefinitionHolder } from "../ApiDefinitionHolder";
import { ApiReferenceNodeConverter } from "../ApiReferenceNodeConverter";
import { NodeIdGenerator } from "../NodeIdGenerator";
import { convertIrToApiDefinition } from "../utils/convertIrToApiDefinition";

const context = createMockTaskContext();

const apiDefinitionId = "550e8400-e29b-41d4-a716-446655440000";

// eslint-disable-next-line jest/no-disabled-tests
it.skip("converts to api reference node", async () => {
    const docsWorkspace = await loadDocsWorkspace({
        rapiddocsDirectory: resolve(AbsoluteFilePath.of(__dirname), "fixtures/stream/rapiddocs"),
        context
    });

    if (docsWorkspace == null) {
        throw new Error("Workspace is null");
    }

    const parsedDocsConfig = await parseDocsConfiguration({
        rawDocsConfiguration: docsWorkspace.config,
        context,
        absolutePathToRapiddocsFolder: docsWorkspace.absoluteFilePath,
        absoluteFilepathToDocsConfig: docsWorkspace.absoluteFilepathToDocsConfig
    });

    if (parsedDocsConfig.navigation.type !== "untabbed") {
        throw new Error("Expected untabbed navigation");
    }

    if (parsedDocsConfig.navigation.items[0]?.type !== "apiSection") {
        throw new Error("Expected apiSection");
    }

    const apiSection = parsedDocsConfig.navigation.items[0];

    const result = await loadAPIWorkspace({
        absolutePathToWorkspace: resolve(AbsoluteFilePath.of(__dirname), "fixtures/stream/rapiddocs"),
        context,
        cliVersion: "0.0.0",
        workspaceName: undefined
    });

    if (!result.didSucceed) {
        throw new Error("API workspace failed to load");
    }

    const apiWorkspace = await result.workspace.toRapiddocsWorkspace({ context });

    if (apiWorkspace.type !== "rapiddocs") {
        throw new Error("Expected rapiddocs workspace");
    }

    const slug = RapiddocsNavigation.V1.SlugGenerator.init("/base/path");

    const ir = generateIntermediateRepresentation({
        workspace: apiWorkspace,
        audiences: { type: "all" },
        generationLanguage: undefined,
        keywords: undefined,
        smartCasing: false,
        exampleGeneration: { disabled: false },
        readme: undefined,
        version: undefined,
        packageName: undefined,
        context,
        sourceResolver: new SourceResolverImpl(context, apiWorkspace)
    });

    const apiDefinition = convertIrToApiDefinition(ir, apiDefinitionId);

    const node = new ApiReferenceNodeConverter(
        apiSection,
        apiDefinition,
        slug,
        docsWorkspace,
        context,
        new Map(),
        new Map(),
        NodeIdGenerator.init(),
        apiWorkspace
    ).get();

    expect(node).toMatchSnapshot();

    const holder = ApiDefinitionHolder.create(apiDefinition);

    expect([...holder.endpointsByLocator.keys()]).toMatchSnapshot("endpointsByLocator keys");
    expect([...holder.subpackagesByLocator.keys()]).toMatchSnapshot("subpackagesByLocator keys");

    // expect(holder.endpointsByLocator.get("DELETE /movies/{id}")).toMatchSnapshot("DELETE /movies/{id}");

    // expect(holder.endpointsByLocator.get("imdb.getMovie")).toMatchSnapshot("imdb.getMovie");
});
