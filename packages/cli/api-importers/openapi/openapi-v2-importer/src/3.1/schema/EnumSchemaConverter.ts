import { OpenAPIV3_1 } from "openapi-types";

import { Type } from "@khulnasoft/ir-sdk";

import { AbstractConverter } from "../../AbstractConverter";
import { ErrorCollector } from "../../ErrorCollector";
import { RapiddocsEnumConfig } from "../../types/RapiddocsEnumConfig";
import { OpenAPIConverterContext3_1 } from "../OpenAPIConverterContext3_1";

export declare namespace EnumSchemaConverter {
    export interface Args extends AbstractConverter.Args {
        schema: OpenAPIV3_1.SchemaObject;
        maybeRapiddocsEnum: RapiddocsEnumConfig | undefined;
    }

    export interface Output {
        enum: Type;
    }
}

export class EnumSchemaConverter extends AbstractConverter<OpenAPIConverterContext3_1, EnumSchemaConverter.Output> {
    private readonly schema: OpenAPIV3_1.SchemaObject;
    private readonly maybeRapiddocsEnum: RapiddocsEnumConfig | undefined;

    constructor({ breadcrumbs, schema, maybeRapiddocsEnum }: EnumSchemaConverter.Args) {
        super({ breadcrumbs });
        this.schema = schema;
        this.maybeRapiddocsEnum = maybeRapiddocsEnum;
    }

    public convert({
        context,
        errorCollector
    }: {
        context: OpenAPIConverterContext3_1;
        errorCollector: ErrorCollector;
    }): EnumSchemaConverter.Output | undefined {
        if (!this.schema.enum) {
            return undefined;
        }

        // Only keep string enum values
        const stringEnumValues = this.schema.enum.filter((value) => typeof value === "string");

        const values = stringEnumValues.map((value) => {
            const rapiddocsEnumValue = this.maybeRapiddocsEnum?.[value];
            const name = rapiddocsEnumValue?.name ?? value.toString();

            return {
                name: context.casingsGenerator.generateNameAndWireValue({
                    name,
                    wireValue: value.toString()
                }),
                docs: rapiddocsEnumValue?.description,
                availability: undefined,
                casing: rapiddocsEnumValue?.casing
            };
        });

        if (values.length === 0) {
            return undefined;
        }

        const default_ = context.getAsString(this.schema.default);
        return {
            enum: Type.enum({
                default: default_ != null ? values.find((v) => v.name.wireValue === default_) : undefined,
                values
            })
        };
    }
}
