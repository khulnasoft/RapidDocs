import { GeneratorNotificationService } from "@khulnasoft/base-generator";
import { AbstractGoGeneratorContext, FileLocation } from "@khulnasoft/go-ast";
import { GoProject } from "@khulnasoft/go-base";

import { RapiddocsGeneratorExec } from "@rapiddocs-rapiddocs/generator-exec-sdk";
import { IntermediateRepresentation, TypeId } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { SdkCustomConfigSchema } from "./SdkCustomConfig";

export class SdkGeneratorContext extends AbstractGoGeneratorContext<SdkCustomConfigSchema> {
    public readonly project: GoProject;

    public constructor(
        public readonly ir: IntermediateRepresentation,
        public readonly config: RapiddocsGeneratorExec.config.GeneratorConfig,
        public readonly customConfig: SdkCustomConfigSchema,
        public readonly generatorNotificationService: GeneratorNotificationService
    ) {
        super(ir, config, customConfig, generatorNotificationService);
        this.project = new GoProject({ context: this });
    }
}
