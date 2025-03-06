import { dependenciesYml } from "@khulnasoft/configuration";
import { AbsoluteFilePath } from "@khulnasoft/path-utils";

import { AbstractAPIWorkspace, RapiddocsDefinition } from "./AbstractAPIWorkspace";
import { IdentifiableSource } from "./Source";

export declare namespace RapiddocsWorkspace {
    export interface Args extends AbstractAPIWorkspace.Args {
        dependenciesConfiguration: dependenciesYml.DependenciesConfiguration;
        definition: RapiddocsDefinition;
        sources?: IdentifiableSource[];
    }
}

export class RapiddocsWorkspace extends AbstractAPIWorkspace<void> {
    public definition: RapiddocsDefinition;
    public sources: IdentifiableSource[];

    constructor({ definition, sources, ...superArgs }: RapiddocsWorkspace.Args) {
        super(superArgs);
        this.definition = definition;
        this.sources = sources ?? [];
    }

    public async getDefinition(): Promise<RapiddocsDefinition> {
        return this.definition;
    }

    public async toRapiddocsWorkspace(): Promise<RapiddocsWorkspace> {
        return this;
    }

    public getSources(): IdentifiableSource[] {
        return this.sources;
    }

    public getAbsoluteFilePaths(): AbsoluteFilePath[] {
        return [this.absoluteFilePath];
    }
}
