/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as RapiddocsIr from "../../../index";

export type ExampleSingleUnionTypeProperties =
    | RapiddocsIr.ExampleSingleUnionTypeProperties.SamePropertiesAsObject
    | RapiddocsIr.ExampleSingleUnionTypeProperties.SingleProperty
    | RapiddocsIr.ExampleSingleUnionTypeProperties.NoProperties;

export namespace ExampleSingleUnionTypeProperties {
    export interface SamePropertiesAsObject extends RapiddocsIr.ExampleObjectTypeWithTypeId, _Utils {
        type: "samePropertiesAsObject";
    }

    export interface SingleProperty extends RapiddocsIr.ExampleTypeReference, _Utils {
        type: "singleProperty";
    }

    export interface NoProperties extends _Utils {
        type: "noProperties";
    }

    export interface _Utils {
        _visit: <_Result>(visitor: RapiddocsIr.ExampleSingleUnionTypeProperties._Visitor<_Result>) => _Result;
    }

    export interface _Visitor<_Result> {
        samePropertiesAsObject: (value: RapiddocsIr.ExampleObjectTypeWithTypeId) => _Result;
        singleProperty: (value: RapiddocsIr.ExampleTypeReference) => _Result;
        noProperties: () => _Result;
        _other: (value: { type: string }) => _Result;
    }
}

export const ExampleSingleUnionTypeProperties = {
    samePropertiesAsObject: (
        value: RapiddocsIr.ExampleObjectTypeWithTypeId,
    ): RapiddocsIr.ExampleSingleUnionTypeProperties.SamePropertiesAsObject => {
        return {
            ...value,
            type: "samePropertiesAsObject",
            _visit: function <_Result>(
                this: RapiddocsIr.ExampleSingleUnionTypeProperties.SamePropertiesAsObject,
                visitor: RapiddocsIr.ExampleSingleUnionTypeProperties._Visitor<_Result>,
            ) {
                return RapiddocsIr.ExampleSingleUnionTypeProperties._visit(this, visitor);
            },
        };
    },

    singleProperty: (value: RapiddocsIr.ExampleTypeReference): RapiddocsIr.ExampleSingleUnionTypeProperties.SingleProperty => {
        return {
            ...value,
            type: "singleProperty",
            _visit: function <_Result>(
                this: RapiddocsIr.ExampleSingleUnionTypeProperties.SingleProperty,
                visitor: RapiddocsIr.ExampleSingleUnionTypeProperties._Visitor<_Result>,
            ) {
                return RapiddocsIr.ExampleSingleUnionTypeProperties._visit(this, visitor);
            },
        };
    },

    noProperties: (): RapiddocsIr.ExampleSingleUnionTypeProperties.NoProperties => {
        return {
            type: "noProperties",
            _visit: function <_Result>(
                this: RapiddocsIr.ExampleSingleUnionTypeProperties.NoProperties,
                visitor: RapiddocsIr.ExampleSingleUnionTypeProperties._Visitor<_Result>,
            ) {
                return RapiddocsIr.ExampleSingleUnionTypeProperties._visit(this, visitor);
            },
        };
    },

    _visit: <_Result>(
        value: RapiddocsIr.ExampleSingleUnionTypeProperties,
        visitor: RapiddocsIr.ExampleSingleUnionTypeProperties._Visitor<_Result>,
    ): _Result => {
        switch (value.type) {
            case "samePropertiesAsObject":
                return visitor.samePropertiesAsObject(value);
            case "singleProperty":
                return visitor.singleProperty(value);
            case "noProperties":
                return visitor.noProperties();
            default:
                return visitor._other(value as any);
        }
    },
} as const;
