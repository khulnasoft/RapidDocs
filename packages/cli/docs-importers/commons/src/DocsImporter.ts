import { TaskContext } from "@khulnasoft/task-context";

import { RapiddocsDocsBuilder } from "./RapiddocsDocsBuilder";

export declare namespace DocsImporter {
    interface BaseArgs {
        context: TaskContext;
    }
}

export abstract class DocsImporter<Args> {
    protected context: TaskContext;

    constructor({ context }: DocsImporter.BaseArgs) {
        this.context = context;
    }

    public abstract import({ args, builder }: { args: Args; builder: RapiddocsDocsBuilder }): Promise<void>;
}
