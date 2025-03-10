/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsIr from "../../../../api/index";
import * as core from "../../../../core";

export const Literal: core.serialization.Schema<serializers.Literal.Raw, RapiddocsIr.Literal> = core.serialization
    .union("type", {
        string: core.serialization.object({
            string: core.serialization.string(),
        }),
        boolean: core.serialization.object({
            boolean: core.serialization.boolean(),
        }),
    })
    .transform<RapiddocsIr.Literal>({
        transform: (value) => {
            switch (value.type) {
                case "string":
                    return RapiddocsIr.Literal.string(value.string);
                case "boolean":
                    return RapiddocsIr.Literal.boolean(value.boolean);
                default:
                    return value as RapiddocsIr.Literal;
            }
        },
        untransform: ({ _visit, ...value }) => value as any,
    });

export declare namespace Literal {
    export type Raw = Literal.String | Literal.Boolean;

    export interface String {
        type: "string";
        string: string;
    }

    export interface Boolean {
        type: "boolean";
        boolean: boolean;
    }
}
