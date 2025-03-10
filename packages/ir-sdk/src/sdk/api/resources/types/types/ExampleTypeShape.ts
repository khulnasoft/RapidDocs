/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as RapiddocsIr from "../../../index";

export type ExampleTypeShape =
    | RapiddocsIr.ExampleTypeShape.Alias
    | RapiddocsIr.ExampleTypeShape.Enum
    | RapiddocsIr.ExampleTypeShape.Object_
    | RapiddocsIr.ExampleTypeShape.Union
    | RapiddocsIr.ExampleTypeShape.UndiscriminatedUnion;

export namespace ExampleTypeShape {
    export interface Alias extends RapiddocsIr.ExampleAliasType, _Utils {
        type: "alias";
    }

    export interface Enum extends RapiddocsIr.ExampleEnumType, _Utils {
        type: "enum";
    }

    export interface Object_ extends RapiddocsIr.ExampleObjectType, _Utils {
        type: "object";
    }

    export interface Union extends RapiddocsIr.ExampleUnionType, _Utils {
        type: "union";
    }

    export interface UndiscriminatedUnion extends RapiddocsIr.ExampleUndiscriminatedUnionType, _Utils {
        type: "undiscriminatedUnion";
    }

    export interface _Utils {
        _visit: <_Result>(visitor: RapiddocsIr.ExampleTypeShape._Visitor<_Result>) => _Result;
    }

    export interface _Visitor<_Result> {
        alias: (value: RapiddocsIr.ExampleAliasType) => _Result;
        enum: (value: RapiddocsIr.ExampleEnumType) => _Result;
        object: (value: RapiddocsIr.ExampleObjectType) => _Result;
        union: (value: RapiddocsIr.ExampleUnionType) => _Result;
        undiscriminatedUnion: (value: RapiddocsIr.ExampleUndiscriminatedUnionType) => _Result;
        _other: (value: { type: string }) => _Result;
    }
}

export const ExampleTypeShape = {
    alias: (value: RapiddocsIr.ExampleAliasType): RapiddocsIr.ExampleTypeShape.Alias => {
        return {
            ...value,
            type: "alias",
            _visit: function <_Result>(
                this: RapiddocsIr.ExampleTypeShape.Alias,
                visitor: RapiddocsIr.ExampleTypeShape._Visitor<_Result>,
            ) {
                return RapiddocsIr.ExampleTypeShape._visit(this, visitor);
            },
        };
    },

    enum: (value: RapiddocsIr.ExampleEnumType): RapiddocsIr.ExampleTypeShape.Enum => {
        return {
            ...value,
            type: "enum",
            _visit: function <_Result>(
                this: RapiddocsIr.ExampleTypeShape.Enum,
                visitor: RapiddocsIr.ExampleTypeShape._Visitor<_Result>,
            ) {
                return RapiddocsIr.ExampleTypeShape._visit(this, visitor);
            },
        };
    },

    object: (value: RapiddocsIr.ExampleObjectType): RapiddocsIr.ExampleTypeShape.Object_ => {
        return {
            ...value,
            type: "object",
            _visit: function <_Result>(
                this: RapiddocsIr.ExampleTypeShape.Object_,
                visitor: RapiddocsIr.ExampleTypeShape._Visitor<_Result>,
            ) {
                return RapiddocsIr.ExampleTypeShape._visit(this, visitor);
            },
        };
    },

    union: (value: RapiddocsIr.ExampleUnionType): RapiddocsIr.ExampleTypeShape.Union => {
        return {
            ...value,
            type: "union",
            _visit: function <_Result>(
                this: RapiddocsIr.ExampleTypeShape.Union,
                visitor: RapiddocsIr.ExampleTypeShape._Visitor<_Result>,
            ) {
                return RapiddocsIr.ExampleTypeShape._visit(this, visitor);
            },
        };
    },

    undiscriminatedUnion: (
        value: RapiddocsIr.ExampleUndiscriminatedUnionType,
    ): RapiddocsIr.ExampleTypeShape.UndiscriminatedUnion => {
        return {
            ...value,
            type: "undiscriminatedUnion",
            _visit: function <_Result>(
                this: RapiddocsIr.ExampleTypeShape.UndiscriminatedUnion,
                visitor: RapiddocsIr.ExampleTypeShape._Visitor<_Result>,
            ) {
                return RapiddocsIr.ExampleTypeShape._visit(this, visitor);
            },
        };
    },

    _visit: <_Result>(value: RapiddocsIr.ExampleTypeShape, visitor: RapiddocsIr.ExampleTypeShape._Visitor<_Result>): _Result => {
        switch (value.type) {
            case "alias":
                return visitor.alias(value);
            case "enum":
                return visitor.enum(value);
            case "object":
                return visitor.object(value);
            case "union":
                return visitor.union(value);
            case "undiscriminatedUnion":
                return visitor.undiscriminatedUnion(value);
            default:
                return visitor._other(value as any);
        }
    },
} as const;
