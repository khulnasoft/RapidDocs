import { AbstractGeneratedSchema } from "@rapiddocs-typescript/abstract-schema-generator";
import { Zurg, getTextOfTsNode } from "@rapiddocs-typescript/commons";
import { ExpressContext } from "@rapiddocs-typescript/contexts";
import { ModuleDeclaration, ts } from "ts-morph";

import { TypeReference } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { AbstractGeneratedEndpointTypeSchema } from "./AbstractGeneratedEndpointTypeSchema";

export declare namespace GeneratedEndpointTypeSchemaImpl {
    export interface Init extends AbstractGeneratedEndpointTypeSchema.Init {
        type: TypeReference;
    }
}

export class GeneratedEndpointTypeSchemaImpl extends AbstractGeneratedEndpointTypeSchema {
    private type: TypeReference;

    constructor({ type, ...superInit }: GeneratedEndpointTypeSchemaImpl.Init) {
        super(superInit);
        this.type = type;
    }

    protected generateRawTypeDeclaration(context: ExpressContext, module: ModuleDeclaration): void {
        module.addTypeAlias({
            name: AbstractGeneratedSchema.RAW_TYPE_NAME,
            type: getTextOfTsNode(context.typeSchema.getReferenceToRawType(this.type).typeNode),
            isExported: true
        });
    }

    protected getReferenceToParsedShape(context: ExpressContext): ts.TypeNode {
        return context.type.getReferenceToType(this.type).typeNode;
    }

    protected buildSchema(context: ExpressContext): Zurg.Schema {
        return context.typeSchema.getSchemaOfTypeReference(this.type);
    }
}
