import { constructCasingsGenerator } from "@khulnasoft/casings-generator";
import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";
import { TypeResolverImpl, constructRapiddocsFileContext } from "@khulnasoft/ir-generator";
import { createMockTaskContext } from "@khulnasoft/task-context";
import { loadAPIWorkspace } from "@khulnasoft/workspace-loader";

describe("TypeResolver", () => {
    it("illogical self-referencing types", async () => {
        const context = createMockTaskContext();
        const parseResult = await loadAPIWorkspace({
            absolutePathToWorkspace: join(
                AbsoluteFilePath.of(__dirname),
                RelativeFilePath.of("fixtures/illogical-self-referencing/rapiddocs/api")
            ),
            context,
            cliVersion: "0.0.0",
            workspaceName: undefined
        });
        if (!parseResult.didSucceed) {
            throw new Error("Failed to parse workspace: " + JSON.stringify(parseResult));
        }
        if (parseResult.workspace.type === "oss") {
            throw new Error("Expected rapiddocs workspace, but received openapi");
        }
        const workspace = await parseResult.workspace.toRapiddocsWorkspace({ context });

        const fooFilepath = RelativeFilePath.of("foo.yml");
        const fooFile = workspace.definition.namedDefinitionFiles[fooFilepath];
        if (fooFile == null) {
            throw new Error(`${fooFilepath} does not exist.`);
        }

        const typeResolver = new TypeResolverImpl(workspace);
        const rapiddocsFileContext = constructRapiddocsFileContext({
            relativeFilepath: fooFilepath,
            definitionFile: fooFile.contents,
            casingsGenerator: constructCasingsGenerator({
                generationLanguage: undefined,
                keywords: undefined,
                smartCasing: false
            }),
            rootApiFile: workspace.definition.rootApiFile.contents
        });

        const resolvedFooType = typeResolver.resolveType({
            type: "Foo",
            file: rapiddocsFileContext
        });
        expect(resolvedFooType).toBeUndefined();

        // to make sure the file is being parsed correctly
        const resolvedBazType = typeResolver.resolveType({
            type: "Baz",
            file: rapiddocsFileContext
        });
        expect(resolvedBazType?._type).toBe("primitive");
    });
});
