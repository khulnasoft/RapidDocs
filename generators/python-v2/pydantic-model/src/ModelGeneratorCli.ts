import { GeneratorNotificationService } from "@khulnasoft/base-generator";
import { AbstractPythonGeneratorCli } from "@khulnasoft/base-python-generator";

import { RapiddocsGeneratorExec } from "@rapiddocs-rapiddocs/generator-exec-sdk";
import { IntermediateRepresentation } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { PydanticModelCustomConfigSchema } from "./ModelCustomConfig";
import { PydanticModelGeneratorContext } from "./ModelGeneratorContext";
import { generateV2Models } from "./v2/generateV2Models";

export class ModelGeneratorCLI extends AbstractPythonGeneratorCli<
    PydanticModelCustomConfigSchema,
    PydanticModelGeneratorContext
> {
    protected constructContext({
        ir,
        customConfig,
        generatorConfig,
        generatorNotificationService
    }: {
        ir: IntermediateRepresentation;
        customConfig: PydanticModelCustomConfigSchema;
        generatorConfig: RapiddocsGeneratorExec.GeneratorConfig;
        generatorNotificationService: GeneratorNotificationService;
    }): PydanticModelGeneratorContext {
        return new PydanticModelGeneratorContext(ir, generatorConfig, customConfig, generatorNotificationService);
    }

    protected parseCustomConfigOrThrow(customConfig: unknown): PydanticModelCustomConfigSchema {
        const parsed = customConfig != null ? PydanticModelCustomConfigSchema.parse(customConfig) : undefined;
        if (parsed != null) {
            return parsed;
        }
        return {};
    }

    protected async writeForDownload(context: PydanticModelGeneratorContext): Promise<void> {
        return await this.generate(context);
    }

    protected async generate(context: PydanticModelGeneratorContext): Promise<void> {
        const files = generateV2Models({ context });
        for (const file of files) {
            context.project.addSourceFiles(file);
        }
        await context.project.persist();
    }

    protected publishPackage(context: PydanticModelGeneratorContext): Promise<void> {
        throw new Error("Method not implemented.");
    }
    protected writeForGithub(context: PydanticModelGeneratorContext): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
