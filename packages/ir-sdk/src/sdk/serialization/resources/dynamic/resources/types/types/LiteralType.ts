/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as RapiddocsIr from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const LiteralType: core.serialization.Schema<serializers.dynamic.LiteralType.Raw, RapiddocsIr.dynamic.LiteralType> =
    core.serialization
        .union("type", {
            boolean: core.serialization.object({
                value: core.serialization.boolean(),
            }),
            string: core.serialization.object({
                value: core.serialization.string(),
            }),
        })
        .transform<RapiddocsIr.dynamic.LiteralType>({
            transform: (value) => {
                switch (value.type) {
                    case "boolean":
                        return RapiddocsIr.dynamic.LiteralType.boolean(value.value);
                    case "string":
                        return RapiddocsIr.dynamic.LiteralType.string(value.value);
                    default:
                        return value as RapiddocsIr.dynamic.LiteralType;
                }
            },
            untransform: ({ _visit, ...value }) => value as any,
        });

export declare namespace LiteralType {
    export type Raw = LiteralType.Boolean | LiteralType.String;

    export interface Boolean {
        type: "boolean";
        value: boolean;
    }

    export interface String {
        type: "string";
        value: string;
    }
}
