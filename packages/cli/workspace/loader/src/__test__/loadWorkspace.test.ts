import assert from "assert";

import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";
import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";
import { createMockTaskContext } from "@khulnasoft/task-context";

import { loadAPIWorkspace } from "../loadAPIWorkspace";

describe("loadWorkspace", () => {
    it("rapiddocs definition", async () => {
        const context = createMockTaskContext();
        const workspace = await loadAPIWorkspace({
            absolutePathToWorkspace: join(AbsoluteFilePath.of(__dirname), RelativeFilePath.of("fixtures/simple")),
            context,
            cliVersion: "0.0.0",
            workspaceName: undefined
        });
        expect(workspace.didSucceed).toBe(true);
        assert(workspace.didSucceed);

        const definition = await workspace.workspace.getDefinition({ context });

        const simpleYaml = definition.namedDefinitionFiles[RelativeFilePath.of("simple.yml")];
        const exampleDateTime = (simpleYaml?.contents.types?.MyDateTime as RawSchemas.BaseTypeDeclarationSchema)
            .examples?.[0]?.value;
        expect(typeof exampleDateTime).toBe("string");
    });

    it("open api", async () => {
        const workspace = await loadAPIWorkspace({
            absolutePathToWorkspace: join(AbsoluteFilePath.of(__dirname), RelativeFilePath.of("fixtures/openapi-path")),
            context: createMockTaskContext(),
            cliVersion: "0.0.0",
            workspaceName: undefined
        });
        expect(workspace.didSucceed).toBe(true);
        assert(workspace.didSucceed);
    });
});
