import hash from "object-hash";

import { AbstractAPIWorkspace, RapiddocsDefinition, RapiddocsWorkspace } from "@khulnasoft/api-workspace-commons";
import {
    DEFINITION_DIRECTORY,
    dependenciesYml,
    generatorsYml,
    loadDependenciesConfiguration
} from "@khulnasoft/configuration-loader";
import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";
import { TaskContext } from "@khulnasoft/task-context";

import { OSSWorkspace } from "./OSSWorkspace";
import { handleFailedWorkspaceParserResultRaw } from "./utils/handleFailedWorkspaceParserResult";
import { listRapiddocsFiles } from "./utils/listRapiddocsFiles";
import { LoadAPIWorkspace } from "./utils/loadAPIWorkspace";
import { parseYamlFiles } from "./utils/parseYamlFiles";
import { processPackageMarkers } from "./utils/processPackageMarkers";
import { validateStructureOfYamlFiles } from "./utils/validateStructureOfYamlFiles";

export declare namespace LazyRapiddocsWorkspace {
    export interface Args extends AbstractAPIWorkspace.Args {
        context: TaskContext;
        loadAPIWorkspace?: LoadAPIWorkspace;
    }
}

export class LazyRapiddocsWorkspace extends AbstractAPIWorkspace<OSSWorkspace.Settings> {
    private context: TaskContext;
    private rapiddocsWorkspaces: Record<string, RapiddocsWorkspace> = {};
    private loadAPIWorkspace?: LoadAPIWorkspace;

    constructor({ context, loadAPIWorkspace, ...superArgs }: LazyRapiddocsWorkspace.Args) {
        super(superArgs);
        this.context = context;
        this.loadAPIWorkspace = loadAPIWorkspace;
    }

    public async getDefinition(
        { context }: { context?: TaskContext },
        settings?: OSSWorkspace.Settings
    ): Promise<RapiddocsDefinition> {
        return (await this.toRapiddocsWorkspace({ context }, settings)).definition;
    }

    public async toRapiddocsWorkspace(
        { context }: { context?: TaskContext },
        settings?: OSSWorkspace.Settings
    ): Promise<RapiddocsWorkspace> {
        const key = hash(settings ?? {});
        let workspace = this.rapiddocsWorkspaces[key];

        if (workspace == null) {
            const defaultedContext = context || this.context;
            const absolutePathToDefinition = join(this.absoluteFilePath, RelativeFilePath.of(DEFINITION_DIRECTORY));
            const dependenciesConfiguration = await loadDependenciesConfiguration({
                absolutePathToWorkspace: this.absoluteFilePath,
                context: defaultedContext
            });

            const yamlFiles = await listRapiddocsFiles(absolutePathToDefinition, "{yml,yaml}");

            const parseResult = await parseYamlFiles(yamlFiles);
            if (!parseResult.didSucceed) {
                handleFailedWorkspaceParserResultRaw(parseResult.failures, defaultedContext.logger);
                return defaultedContext.failAndThrow();
            }

            const structuralValidationResult = validateStructureOfYamlFiles({
                files: parseResult.files,
                absolutePathToDefinition
            });
            if (!structuralValidationResult.didSucceed) {
                handleFailedWorkspaceParserResultRaw(structuralValidationResult.failures, defaultedContext.logger);
                return defaultedContext.failAndThrow();
            }

            const processPackageMarkersResult = await processPackageMarkers({
                dependenciesConfiguration,
                structuralValidationResult,
                context: defaultedContext,
                cliVersion: this.cliVersion,
                settings,
                loadAPIWorkspace: this.loadAPIWorkspace
            });
            if (!processPackageMarkersResult.didSucceed) {
                handleFailedWorkspaceParserResultRaw(processPackageMarkersResult.failures, defaultedContext.logger);
                return defaultedContext.failAndThrow();
            }

            workspace = new RapiddocsWorkspace({
                absoluteFilePath: this.absoluteFilePath,
                generatorsConfiguration: this.generatorsConfiguration,
                dependenciesConfiguration,
                workspaceName: this.workspaceName,
                definition: {
                    absoluteFilePath: absolutePathToDefinition,
                    rootApiFile: structuralValidationResult.rootApiFile,
                    namedDefinitionFiles: structuralValidationResult.namedDefinitionFiles,
                    packageMarkers: processPackageMarkersResult.packageMarkers,
                    importedDefinitions: processPackageMarkersResult.importedDefinitions
                },
                cliVersion: this.cliVersion,
                sources: []
            });

            this.rapiddocsWorkspaces[key] = workspace;
        }

        return workspace;
    }

    public getAbsoluteFilePaths(): AbsoluteFilePath[] {
        return [this.absoluteFilePath];
    }
}
