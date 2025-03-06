import { AbstractGeneratorCli, parseIR } from "@khulnasoft/base-generator";
import { AbsoluteFilePath } from "@khulnasoft/fs-utils";

import { IntermediateRepresentation } from "@rapiddocs-rapiddocs/ir-sdk/api";
import * as IrSerialization from "@rapiddocs-rapiddocs/ir-sdk/serialization";

import { AbstractCsharpGeneratorContext } from "../context/AbstractCsharpGeneratorContext";
import { BaseCsharpCustomConfigSchema } from "../custom-config/BaseCsharpCustomConfigSchema";

export abstract class AbstractCsharpGeneratorCli<
    CustomConfig extends BaseCsharpCustomConfigSchema,
    CsharpGeneratorContext extends AbstractCsharpGeneratorContext<CustomConfig>
> extends AbstractGeneratorCli<CustomConfig, IntermediateRepresentation, CsharpGeneratorContext> {
    /**
     * Parses the IR for the Csharp generators
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
