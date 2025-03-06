import { TaskContext } from "@khulnasoft/task-context";

export interface IrMigrationContext {
    taskContext: TaskContext;
    targetGenerator: GeneratorNameAndVersion | undefined;
}

export interface GeneratorNameAndVersion {
    name: string;
    version: string;
}
