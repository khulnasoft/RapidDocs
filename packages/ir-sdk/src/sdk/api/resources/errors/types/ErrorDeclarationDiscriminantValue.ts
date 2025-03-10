/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as RapiddocsIr from "../../../index";

export type ErrorDeclarationDiscriminantValue =
    | RapiddocsIr.ErrorDeclarationDiscriminantValue.Property
    | RapiddocsIr.ErrorDeclarationDiscriminantValue.StatusCode;

export namespace ErrorDeclarationDiscriminantValue {
    export interface Property extends RapiddocsIr.NameAndWireValue, _Utils {
        type: "property";
    }

    export interface StatusCode extends _Utils {
        type: "statusCode";
    }

    export interface _Utils {
        _visit: <_Result>(visitor: RapiddocsIr.ErrorDeclarationDiscriminantValue._Visitor<_Result>) => _Result;
    }

    export interface _Visitor<_Result> {
        property: (value: RapiddocsIr.NameAndWireValue) => _Result;
        statusCode: () => _Result;
        _other: (value: { type: string }) => _Result;
    }
}

export const ErrorDeclarationDiscriminantValue = {
    property: (value: RapiddocsIr.NameAndWireValue): RapiddocsIr.ErrorDeclarationDiscriminantValue.Property => {
        return {
            ...value,
            type: "property",
            _visit: function <_Result>(
                this: RapiddocsIr.ErrorDeclarationDiscriminantValue.Property,
                visitor: RapiddocsIr.ErrorDeclarationDiscriminantValue._Visitor<_Result>,
            ) {
                return RapiddocsIr.ErrorDeclarationDiscriminantValue._visit(this, visitor);
            },
        };
    },

    statusCode: (): RapiddocsIr.ErrorDeclarationDiscriminantValue.StatusCode => {
        return {
            type: "statusCode",
            _visit: function <_Result>(
                this: RapiddocsIr.ErrorDeclarationDiscriminantValue.StatusCode,
                visitor: RapiddocsIr.ErrorDeclarationDiscriminantValue._Visitor<_Result>,
            ) {
                return RapiddocsIr.ErrorDeclarationDiscriminantValue._visit(this, visitor);
            },
        };
    },

    _visit: <_Result>(
        value: RapiddocsIr.ErrorDeclarationDiscriminantValue,
        visitor: RapiddocsIr.ErrorDeclarationDiscriminantValue._Visitor<_Result>,
    ): _Result => {
        switch (value.type) {
            case "property":
                return visitor.property(value);
            case "statusCode":
                return visitor.statusCode();
            default:
                return visitor._other(value as any);
        }
    },
} as const;
