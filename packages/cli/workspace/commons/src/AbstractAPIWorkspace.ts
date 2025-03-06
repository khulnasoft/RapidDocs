import { generatorsYml } from "@khulnasoft/configuration";
import { DefinitionFileSchema, PackageMarkerFileSchema, RootApiFileSchema } from "@khulnasoft/rapiddocs-definition-schema";
import { AbsoluteFilePath, RelativeFilePath } from "@khulnasoft/path-utils";
import { TaskContext } from "@khulnasoft/task-context";

import { APIChangelog } from "./APIChangelog";
import { ParsedRapiddocsFile } from "./RapiddocsFile";
import { RapiddocsWorkspace } from "./RapiddocsWorkspace";

export interface RapiddocsDefinition {
    absoluteFilePath: AbsoluteFilePath;
    rootApiFile: ParsedRapiddocsFile<RootApiFileSchema>;
    namedDefinitionFiles: Record<RelativeFilePath, OnDiskNamedDefinitionFile>;
    packageMarkers: Record<RelativeFilePath, ParsedRapiddocsFile<PackageMarkerFileSchema>>;
    importedDefinitions: Record<RelativeFilePath, ImportedDefinition>;
}

export interface OnDiskNamedDefinitionFile extends ParsedRapiddocsFile<DefinitionFileSchema> {
    absoluteFilePath: AbsoluteFilePath;
}

export interface ImportedDefinition {
    url: string | undefined;
    definition: RapiddocsDefinition;
}

export declare namespace AbstractAPIWorkspace {
    interface Args {
        generatorsConfiguration: generatorsYml.GeneratorsConfiguration | undefined;
        workspaceName: string | undefined;
        cliVersion: string;
        absoluteFilePath: AbsoluteFilePath;
        changelog?: APIChangelog;
    }

    export const Type = "api";
}

/**
 * Represents an arbitrary API Definition within the Rapiddocs folder. Each API Definition
 * will eventually have a set of canonical operations such as `validate`, `lint`, etc.
 *
 * Each API Definition will also be able to convert themselves into a `RapiddocsWorkspace`
 * to be interoperable with the rest of the codebase.
 */
export abstract class AbstractAPIWorkspace<Settings> {
    public generatorsConfiguration: generatorsYml.GeneratorsConfiguration | undefined;
    public workspaceName: string | undefined;
    public cliVersion: string;
    public absoluteFilePath: AbsoluteFilePath;
    public changelog: APIChangelog | undefined;

    public type = AbstractAPIWorkspace.Type;

    public constructor({
        generatorsConfiguration,
        workspaceName,
        cliVersion,
        absoluteFilePath,
        changelog
    }: AbstractAPIWorkspace.Args) {
        this.generatorsConfiguration = generatorsConfiguration;
        this.workspaceName = workspaceName;
        this.cliVersion = cliVersion;
        this.absoluteFilePath = absoluteFilePath;
        this.changelog = changelog;
    }

    public abstract toRapiddocsWorkspace({ context }: { context: TaskContext }, settings?: Settings): Promise<RapiddocsWorkspace>;

    /**
     * @returns The Rapiddocs Definition that corresponds to this workspace
     */
    public abstract getDefinition({ context }: { context?: TaskContext }, settings?: Settings): Promise<RapiddocsDefinition>;

    /**
     * @returns all filepaths related to this workspace
     */
    public abstract getAbsoluteFilePaths(): AbsoluteFilePath[];
}

/**
 * Equivalent to the `AbstractAPIWorkspace` class, but without async methods.
 * This is useful in environments that don't have access to async code.
 */
export abstract class AbstractAPIWorkspaceSync<Settings> {
    public generatorsConfiguration: generatorsYml.GeneratorsConfiguration | undefined;
    public workspaceName: string | undefined;
    public cliVersion: string;
    public absoluteFilePath: AbsoluteFilePath;
    public changelog: APIChangelog | undefined;

    public type = AbstractAPIWorkspace.Type;

    public constructor({
        generatorsConfiguration,
        workspaceName,
        cliVersion,
        absoluteFilePath,
        changelog
    }: AbstractAPIWorkspace.Args) {
        this.generatorsConfiguration = generatorsConfiguration;
        this.workspaceName = workspaceName;
        this.cliVersion = cliVersion;
        this.absoluteFilePath = absoluteFilePath;
        this.changelog = changelog;
    }

    public abstract toRapiddocsWorkspace({ context }: { context: TaskContext }, settings?: Settings): RapiddocsWorkspace;

    /**
     * @returns The Rapiddocs Definition that corresponds to this workspace
     */
    public abstract getDefinition({ context }: { context?: TaskContext }, settings?: Settings): RapiddocsDefinition;

    /**
     * @returns all filepaths related to this workspace
     */
    public abstract getAbsoluteFilePaths(): AbsoluteFilePath[];
}
