import { AbstractGeneratorCli, parseIR } from "@khulnasoft/base-generator";
import { AbsoluteFilePath } from "@khulnasoft/fs-utils";
import { AbstractGoGeneratorContext } from "@khulnasoft/go-ast";
import { BaseGoCustomConfigSchema } from "@khulnasoft/go-ast";

import { IntermediateRepresentation } from "@rapiddocs-rapiddocs/ir-sdk/api";
import * as IrSerialization from "@rapiddocs-rapiddocs/ir-sdk/serialization";

export abstract class AbstractGoGeneratorCli<
    CustomConfig extends BaseGoCustomConfigSchema,
    GoGeneratorContext extends AbstractGoGeneratorContext<CustomConfig>
> extends AbstractGeneratorCli<CustomConfig, IntermediateRepresentation, GoGeneratorContext> {
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
