import { AbstractGeneratorCli, parseIR } from "@khulnasoft/base-generator";
import { AbsoluteFilePath } from "@khulnasoft/fs-utils";
import { BasePhpCustomConfigSchema } from "@khulnasoft/php-codegen";

import { IntermediateRepresentation } from "@rapiddocs-rapiddocs/ir-sdk/api";
import * as IrSerialization from "@rapiddocs-rapiddocs/ir-sdk/serialization";

import { AbstractPhpGeneratorContext } from "../context/AbstractPhpGeneratorContext";

export abstract class AbstractPhpGeneratorCli<
    CustomConfig extends BasePhpCustomConfigSchema,
    PhpGeneratorContext extends AbstractPhpGeneratorContext<CustomConfig>
> extends AbstractGeneratorCli<CustomConfig, IntermediateRepresentation, PhpGeneratorContext> {
    /**
     * Parses the IR for the PHP generators
     * @param irFilepath
     * @returns
     */
    protected async parseIntermediateRepresentation(irFilepath: string): Promise<IntermediateRepresentation> {
        return await parseIR<IntermediateRepresentation>({
            absolutePathToIR: AbsoluteFilePath.of(irFilepath),
            parse: IrSerialization.IntermediateRepresentation.parse
        });
    }
}
