import { DefinitionFileSchema, PackageMarkerFileSchema, RootApiFileSchema } from "@khulnasoft/rapiddocs-definition-schema";
import { RelativeFilePath } from "@khulnasoft/path-utils";
import { TaskContext } from "@khulnasoft/task-context";

export declare namespace APIDefinitionImporter {
    interface Return {
        rootApiFile: RootApiFileSchema;
        packageMarkerFile: PackageMarkerFileSchema;
        definitionFiles: Record<RelativeFilePath, DefinitionFileSchema>;
    }
}

export abstract class APIDefinitionImporter<T> {
    public constructor(protected readonly context?: TaskContext) {}

    public abstract import(input: T): Promise<APIDefinitionImporter.Return>;
}
