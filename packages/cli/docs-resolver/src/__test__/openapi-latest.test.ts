import { parseDocsConfiguration } from "@khulnasoft/configuration-loader";
import { RapiddocsNavigation } from "@khulnasoft/fdr-sdk";
import { AbsoluteFilePath, resolve } from "@khulnasoft/fs-utils";
import { OSSWorkspace } from "@khulnasoft/lazy-rapiddocs-workspace";
import { createMockTaskContext } from "@khulnasoft/task-context";
import { loadAPIWorkspace, loadDocsWorkspace } from "@khulnasoft/workspace-loader";

import { ApiReferenceNodeConverterLatest } from "../ApiReferenceNodeConverterLatest";
import { NodeIdGenerator } from "../NodeIdGenerator";
import { generateFdrFromOpenApiWorkspace } from "../utils/generateFdrFromOpenApiWorkspace";

const context = createMockTaskContext();

// eslint-disable-next-line jest/no-disabled-tests
it.skip("converts to api reference latest node", async () => {
    const docsWorkspace = await loadDocsWorkspace({
        rapiddocsDirectory: resolve(AbsoluteFilePath.of(__dirname), "fixtures/openapi-latest/rapiddocs"),
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
        absolutePathToWorkspace: resolve(AbsoluteFilePath.of(__dirname), "fixtures/openapi-latest/rapiddocs"),
        context,
        cliVersion: "0.0.0",
        workspaceName: undefined
    });

    if (!result.didSucceed) {
        throw new Error("API workspace failed to load");
    }

    const apiWorkspace = result.workspace;

    if (!(apiWorkspace instanceof OSSWorkspace)) {
        throw new Error("Expected oss workspace");
    }

    const slug = RapiddocsNavigation.V1.SlugGenerator.init("/base/path");

    const api = await generateFdrFromOpenApiWorkspace(apiWorkspace, context);

    if (api == null) {
        throw new Error("API is null");
    }

    const node = new ApiReferenceNodeConverterLatest(
        apiSection,
        api,
        slug,
        apiWorkspace,
        docsWorkspace,
        context,
        new Map(),
        new Map(),
        NodeIdGenerator.init()
    ).get();

    expect(node).toMatchSnapshot();
});
