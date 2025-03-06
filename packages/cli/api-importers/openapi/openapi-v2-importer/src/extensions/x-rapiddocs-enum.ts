import { z } from "zod";

import { OpenAPIConverterContext3_1 } from "../3.1/OpenAPIConverterContext3_1";
import { AbstractConverter } from "../AbstractConverter";
import { AbstractExtension } from "../AbstractExtension";
import { ErrorCollector } from "../ErrorCollector";
import { RapiddocsEnumConfig } from "../types/RapiddocsEnumConfig";

const CasingConfigSchema = z.object({
    snake: z.string().optional(),
    camel: z.string().optional(),
    screamingSnake: z.string().optional(),
    pascal: z.string().optional()
});

const EnumValueConfigSchema = z.object({
    description: z.string().optional(),
    name: z.string().optional(),
    casing: CasingConfigSchema.optional()
});

const RapiddocsEnumConfigSchema = z.record(EnumValueConfigSchema);

export declare namespace RapiddocsEnumExtension {
    export interface Args extends AbstractConverter.Args {
        schema: object;
    }

    export type Output = RapiddocsEnumConfig;
}

export class RapiddocsEnumExtension extends AbstractExtension<OpenAPIConverterContext3_1, RapiddocsEnumExtension.Output> {
    private readonly schema: object;
    public readonly key = "x-rapiddocs-enum";

    constructor({ breadcrumbs, schema }: RapiddocsEnumExtension.Args) {
        super({ breadcrumbs });
        this.schema = schema;
    }

    public convert({
        context,
        errorCollector
    }: {
        context: OpenAPIConverterContext3_1;
        errorCollector: ErrorCollector;
    }): RapiddocsEnumExtension.Output | undefined {
        const extensionValue = this.getExtensionValue(this.schema);
        if (extensionValue == null) {
            return undefined;
        }

        const result = RapiddocsEnumConfigSchema.safeParse(extensionValue);
        if (!result.success) {
            errorCollector.collect({
                message: `Invalid x-rapiddocs-enum extension: ${result.error.message}`,
                path: this.breadcrumbs
            });
            return undefined;
        }

        return result.data;
    }
}
