import { DefinitionFileSchema, PackageMarkerFileSchema, RootApiFileSchema } from "@khulnasoft/rapiddocs-definition-schema";
import { RelativeFilePath } from "@khulnasoft/path-utils";

import { OpenApiIrConverterContext, OpenApiIrConverterContextOpts } from "./OpenApiIrConverterContext";
import { buildRapiddocsDefinition } from "./buildRapiddocsDefinition";

export interface OpenApiConvertedRapiddocsDefinition {
    rootApiFile: RootApiFileSchema;
    packageMarkerFile: PackageMarkerFileSchema;
    definitionFiles: Record<RelativeFilePath, DefinitionFileSchema>;
}

export function convert(opts: OpenApiIrConverterContextOpts): OpenApiConvertedRapiddocsDefinition {
    const context = new OpenApiIrConverterContext(opts);
    return buildRapiddocsDefinition(context);
}
