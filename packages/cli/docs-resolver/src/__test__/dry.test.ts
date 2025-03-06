import { docsYml } from "@khulnasoft/configuration-loader";
import { RapiddocsNavigation } from "@khulnasoft/fdr-sdk";
import { AbsoluteFilePath, resolve } from "@khulnasoft/fs-utils";
import { createMockTaskContext } from "@khulnasoft/task-context";
import { loadDocsWorkspace } from "@khulnasoft/workspace-loader";

import { DocsDefinitionResolver } from "../DocsDefinitionResolver";

const context = createMockTaskContext();

// eslint-disable-next-line jest/no-disabled-tests
it.skip("converts to api reference node", async () => {
    const docsWorkspace = await loadDocsWorkspace({
        rapiddocsDirectory: resolve(AbsoluteFilePath.of(__dirname), "fixtures/dry/rapiddocs"),
        context
    });

    if (docsWorkspace == null) {
        throw new Error("Workspace is null");
    }

    const resolver = new DocsDefinitionResolver(
        "domain",
        docsWorkspace,
        [],
        [],
        context,
        undefined,
        async (_files) => [],
        async (_opts) => "",
        async (_opts) => ""
    );

    const resolved = await resolver.resolve();

    expect(resolved.pages[RapiddocsNavigation.PageId("page.mdx")]?.markdown).toMatchSnapshot();
});
