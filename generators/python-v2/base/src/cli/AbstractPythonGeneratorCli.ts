import { AbstractGeneratorCli, parseIR } from "@khulnasoft/base-generator";
import { AbsoluteFilePath } from "@khulnasoft/fs-utils";

import { IntermediateRepresentation } from "@rapiddocs-rapiddocs/ir-sdk/api";
import * as IrSerialization from "@rapiddocs-rapiddocs/ir-sdk/serialization";

import { AbstractPythonGeneratorContext } from "../context/AbstractPythonGeneratorContext";
import { BasePythonCustomConfigSchema } from "../custom-config/BasePythonCustomConfigSchema";

export abstract class AbstractPythonGeneratorCli<
    CustomConfig extends BasePythonCustomConfigSchema,
    PythonGeneratorContext extends AbstractPythonGeneratorContext<CustomConfig>
> extends AbstractGeneratorCli<CustomConfig, IntermediateRepresentation, PythonGeneratorContext> {
    /**
     * Parses the IR for the Python generators
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
