import yaml from "js-yaml";

import { AbstractAPIWorkspace, RapiddocsDefinition, RapiddocsWorkspace } from "@khulnasoft/api-workspace-commons";
import { RAPIDDOCS_PACKAGE_MARKER_FILENAME } from "@khulnasoft/configuration-loader";
import { ConjureImporter } from "@khulnasoft/conjure-to-rapiddocs";
import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";
import { TaskContext } from "@khulnasoft/task-context";

import { mapValues } from "./utils/mapValues";

export declare namespace ConjureWorkspace {
    export interface Args extends AbstractAPIWorkspace.Args {
        context: TaskContext;
        relativePathToConjureDirectory: RelativeFilePath;
    }

    export interface Settings {}
}

export class ConjureWorkspace extends AbstractAPIWorkspace<ConjureWorkspace.Settings> {
    private absolutePathToConjureFolder: AbsoluteFilePath;

    constructor({ relativePathToConjureDirectory, ...superArgs }: ConjureWorkspace.Args) {
        super(superArgs);
        this.absolutePathToConjureFolder = join(superArgs.absoluteFilePath, relativePathToConjureDirectory);
    }

    public async toRapiddocsWorkspace(
        { context }: { context: TaskContext },
        settings?: ConjureWorkspace.Settings
    ): Promise<RapiddocsWorkspace> {
        const definition = await this.getDefinition({ context }, settings);
        return new RapiddocsWorkspace({
            absoluteFilePath: this.absoluteFilePath,
            workspaceName: this.workspaceName,
            generatorsConfiguration: this.generatorsConfiguration,
            dependenciesConfiguration: {
                dependencies: {}
            },
            definition,
            cliVersion: this.cliVersion,
            sources: undefined
        });
    }

    public async getDefinition(
        { context }: { context?: TaskContext | undefined },
        settings?: ConjureWorkspace.Settings
    ): Promise<RapiddocsDefinition> {
        const conjure = new ConjureImporter(context);
        const definition = await conjure.import({
            absolutePathToConjureFolder: this.absolutePathToConjureFolder,
            authOverrides:
                this.generatorsConfiguration?.api?.auth != null ? { ...this.generatorsConfiguration?.api } : undefined,
            environmentOverrides:
                this.generatorsConfiguration?.api?.environments != null
                    ? { ...this.generatorsConfiguration?.api }
                    : undefined,
            globalHeaderOverrides:
                this.generatorsConfiguration?.api?.headers != null
                    ? { ...this.generatorsConfiguration?.api }
                    : undefined
        });
        return {
            // these files doesn't live on disk, so there's no absolute filepath
            absoluteFilePath: AbsoluteFilePath.of("/DUMMY_PATH"),
            rootApiFile: {
                defaultUrl: definition.rootApiFile["default-url"],
                contents: definition.rootApiFile,
                rawContents: yaml.dump(definition.rootApiFile)
            },
            namedDefinitionFiles: {
                ...mapValues(definition.definitionFiles, (definitionFile) => ({
                    // these files doesn't live on disk, so there's no absolute filepath
                    absoluteFilepath: AbsoluteFilePath.of("/DUMMY_PATH"),
                    rawContents: yaml.dump(definitionFile),
                    contents: definitionFile
                })),
                [RelativeFilePath.of(RAPIDDOCS_PACKAGE_MARKER_FILENAME)]: {
                    // these files doesn't live on disk, so there's no absolute filepath
                    absoluteFilepath: AbsoluteFilePath.of("/DUMMY_PATH"),
                    rawContents: yaml.dump(definition.packageMarkerFile),
                    contents: definition.packageMarkerFile
                }
            },
            packageMarkers: {},
            importedDefinitions: {}
        };
    }

    public getAbsoluteFilePaths(): AbsoluteFilePath[] {
        return [this.absolutePathToConjureFolder];
    }
}
