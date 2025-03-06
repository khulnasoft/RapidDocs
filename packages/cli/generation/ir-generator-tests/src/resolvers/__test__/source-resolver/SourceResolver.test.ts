import { constructCasingsGenerator } from "@khulnasoft/casings-generator";
import { SourceResolverImpl } from "@khulnasoft/cli-source-resolver";
import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";
import { constructRapiddocsFileContext } from "@khulnasoft/ir-generator";
import { createMockTaskContext } from "@khulnasoft/task-context";
import { loadAPIWorkspace } from "@khulnasoft/workspace-loader";

describe("SourceResolver", () => {
    it("non-existant proto source throws", async () => {
        const context = createMockTaskContext();
        const parseResult = await loadAPIWorkspace({
            absolutePathToWorkspace: join(
                AbsoluteFilePath.of(__dirname),
                RelativeFilePath.of("fixtures/invalid-source-proto/rapiddocs/api")
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

        const sourceResolver = new SourceResolverImpl(context, workspace);
        await expect(async () => {
            await sourceResolver.resolveSourceOrThrow({
                source: {
                    proto: "proto/cool-spec.proto"
                },
                relativeFilepath: rapiddocsFileContext.relativeFilepath
            });
        }).rejects.toThrow(new Error("Cannot resolve source proto/cool-spec.proto from file foo.yml"));
    });

    it("non-existant oas source does not throw", async () => {
        const context = createMockTaskContext();
        const parseResult = await loadAPIWorkspace({
            absolutePathToWorkspace: join(
                AbsoluteFilePath.of(__dirname),
                RelativeFilePath.of("fixtures/invalid-source-proto/rapiddocs/api")
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

        const sourceResolver = new SourceResolverImpl(context, workspace);
        const resolved = await sourceResolver.resolveSourceOrThrow({
            source: {
                openapi: "openapi/openapi.yaml"
            },
            relativeFilepath: rapiddocsFileContext.relativeFilepath
        });
        expect(resolved).toBeUndefined();
    });
});
