import { RapiddocsGeneratorCli } from "@rapiddocs-rapiddocs/generator-cli-sdk";

export class ReferenceConfigBuilder {
    private rootSection: RapiddocsGeneratorCli.RootPackageReferenceSection | undefined;
    private sections: RapiddocsGeneratorCli.ReferenceSection[] = [];

    public build(language: RapiddocsGeneratorCli.Language): RapiddocsGeneratorCli.ReferenceConfig {
        return {
            rootSection: this.rootSection,
            sections: this.sections,
            language
        };
    }

    public addRootSection(): ReferenceSectionBuilder {
        const endpoints: RapiddocsGeneratorCli.EndpointReference[] = [];
        this.rootSection = {
            endpoints
        };
        return new ReferenceSectionBuilder({ endpoints });
    }

    public addSection({ title, description }: { title: string; description?: string }): ReferenceSectionBuilder {
        const endpoints: RapiddocsGeneratorCli.EndpointReference[] = [];
        const section: RapiddocsGeneratorCli.ReferenceSection = {
            title,
            description,
            endpoints
        };
        this.sections.push(section);
        return new ReferenceSectionBuilder({ endpoints });
    }

    public isEmpty(): boolean {
        return this.rootSection == null && this.sections.length === 0;
    }
}

export class ReferenceSectionBuilder {
    private endpoints: RapiddocsGeneratorCli.EndpointReference[];

    constructor({ endpoints }: { endpoints: RapiddocsGeneratorCli.EndpointReference[] }) {
        this.endpoints = endpoints;
    }

    public addEndpoint(endpoint: RapiddocsGeneratorCli.EndpointReference): void {
        this.endpoints.push(endpoint);
    }
}
