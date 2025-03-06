import {
    CoreUtilitiesManager,
    DependencyManager,
    ExternalDependencies,
    ImportsManager,
    createExternalDependencies
} from "@rapiddocs-typescript/commons";
import { CoreUtilities } from "@rapiddocs-typescript/commons/src/core-utilities/CoreUtilities";
import { BaseContext, JsonContext, TypeContext, TypeSchemaContext } from "@rapiddocs-typescript/contexts";
import { SourceFile } from "ts-morph";

import { Logger } from "@khulnasoft/logger";

import { Constants } from "@rapiddocs-rapiddocs/ir-sdk/api";

export declare namespace BaseContextImpl {
    export interface Init {
        logger: Logger;
        sourceFile: SourceFile;
        importsManager: ImportsManager;
        dependencyManager: DependencyManager;
        coreUtilitiesManager: CoreUtilitiesManager;
        rapiddocsConstants: Constants;
        type: TypeContext;
        typeSchema: TypeSchemaContext;
        jsonContext: JsonContext;
        includeSerdeLayer: boolean;
    }
}

export class BaseContextImpl implements BaseContext {
    public readonly logger: Logger;
    public readonly sourceFile: SourceFile;
    public readonly externalDependencies: ExternalDependencies;
    public readonly coreUtilities: CoreUtilities;
    public readonly rapiddocsConstants: Constants;
    public readonly type: TypeContext;
    public readonly typeSchema: TypeSchemaContext;
    public readonly includeSerdeLayer: boolean;
    public readonly jsonContext: JsonContext;

    constructor({
        logger,
        sourceFile,
        importsManager,
        dependencyManager,
        coreUtilitiesManager,
        rapiddocsConstants,
        type,
        typeSchema,
        includeSerdeLayer,
        jsonContext
    }: BaseContextImpl.Init) {
        this.logger = logger;
        this.sourceFile = sourceFile;
        this.rapiddocsConstants = rapiddocsConstants;
        this.type = type;
        this.typeSchema = typeSchema;
        this.jsonContext = jsonContext;
        this.includeSerdeLayer = includeSerdeLayer;
        this.externalDependencies = createExternalDependencies({
            dependencyManager,
            importsManager
        });
        this.coreUtilities = coreUtilitiesManager.getCoreUtilities({
            sourceFile,
            importsManager
        });
    }
}
