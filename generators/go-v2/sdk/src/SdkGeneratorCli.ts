import { GeneratorNotificationService } from "@khulnasoft/base-generator";
import { go } from "@khulnasoft/go-ast";
import { AbstractGoGeneratorCli } from "@khulnasoft/go-base";

import { RapiddocsGeneratorExec } from "@rapiddocs-rapiddocs/generator-exec-sdk";
import { IntermediateRepresentation } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { SdkCustomConfigSchema } from "./SdkCustomConfig";
import { SdkGeneratorContext } from "./SdkGeneratorContext";
import { WireTestGenerator } from "./wiretest/WireTestGenerator";

export class SdkGeneratorCLI extends AbstractGoGeneratorCli<SdkCustomConfigSchema, SdkGeneratorContext> {
    protected constructContext({
        ir,
        customConfig,
        generatorConfig,
        generatorNotificationService
    }: {
        ir: IntermediateRepresentation;
        customConfig: SdkCustomConfigSchema;
        generatorConfig: RapiddocsGeneratorExec.GeneratorConfig;
        generatorNotificationService: GeneratorNotificationService;
    }): SdkGeneratorContext {
        return new SdkGeneratorContext(ir, generatorConfig, customConfig, generatorNotificationService);
    }

    protected parseCustomConfigOrThrow(customConfig: unknown): SdkCustomConfigSchema {
        const parsed = customConfig != null ? SdkCustomConfigSchema.parse(customConfig) : undefined;
        if (parsed != null) {
            return parsed;
        }
        return {};
    }

    protected async publishPackage(context: SdkGeneratorContext): Promise<void> {
        throw new Error("Method not implemented.");
    }

    protected async writeForGithub(context: SdkGeneratorContext): Promise<void> {
        await this.generate(context);
    }

    protected async writeForDownload(context: SdkGeneratorContext): Promise<void> {
        await this.generate(context);
    }

    protected async generate(context: SdkGeneratorContext): Promise<void> {
        // TODO: Enable wire tests, when available.
        // this.generateWireTests(context);
        await context.project.persist();
    }

    private generateWireTests(context: SdkGeneratorContext) {
        const wireTestGenerator = new WireTestGenerator(context);
        for (const subpackage of Object.values(context.ir.subpackages)) {
            const serviceId = subpackage.service != null ? subpackage.service : undefined;
            if (serviceId == null) {
                continue;
            }
            const service = context.getHttpServiceOrThrow(serviceId);
            context.project.addGoFiles(wireTestGenerator.generate({ serviceId, endpoints: service.endpoints }));
        }
    }
}
