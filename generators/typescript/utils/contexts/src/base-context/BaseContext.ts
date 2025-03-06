import { ExternalDependencies } from "@rapiddocs-typescript/commons";
import { CoreUtilities } from "@rapiddocs-typescript/commons/src/core-utilities/CoreUtilities";
import { SourceFile } from "ts-morph";

import { Logger } from "@khulnasoft/logger";

import { Constants } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { TypeContext, TypeSchemaContext } from "../model-context";
import { JsonContext } from "./json";

export interface BaseContext {
    logger: Logger;
    sourceFile: SourceFile;
    externalDependencies: ExternalDependencies;
    coreUtilities: CoreUtilities;
    rapiddocsConstants: Constants;
    type: TypeContext;
    typeSchema: TypeSchemaContext;
    includeSerdeLayer: boolean;
    jsonContext: JsonContext;
}
