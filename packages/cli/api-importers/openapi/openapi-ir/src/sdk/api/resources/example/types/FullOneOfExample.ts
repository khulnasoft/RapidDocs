/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as RapiddocsOpenapiIr from "../../../index";

export type FullOneOfExample =
    | RapiddocsOpenapiIr.FullOneOfExample.Discriminated
    | RapiddocsOpenapiIr.FullOneOfExample.Undiscriminated;

export namespace FullOneOfExample {
    export interface Discriminated extends _Utils {
        type: "discriminated";
        value: Record<RapiddocsOpenapiIr.PropertyKey, RapiddocsOpenapiIr.FullExample>;
    }

    export interface Undiscriminated extends _Utils {
        type: "undiscriminated";
        value: RapiddocsOpenapiIr.FullExample;
    }

    export interface _Utils {
        _visit: <_Result>(visitor: RapiddocsOpenapiIr.FullOneOfExample._Visitor<_Result>) => _Result;
    }

    export interface _Visitor<_Result> {
        discriminated: (value: Record<RapiddocsOpenapiIr.PropertyKey, RapiddocsOpenapiIr.FullExample>) => _Result;
        undiscriminated: (value: RapiddocsOpenapiIr.FullExample) => _Result;
        _other: (value: { type: string }) => _Result;
    }
}

export const FullOneOfExample = {
    discriminated: (
        value: Record<RapiddocsOpenapiIr.PropertyKey, RapiddocsOpenapiIr.FullExample>,
    ): RapiddocsOpenapiIr.FullOneOfExample.Discriminated => {
        return {
            value: value,
            type: "discriminated",
            _visit: function <_Result>(
                this: RapiddocsOpenapiIr.FullOneOfExample.Discriminated,
                visitor: RapiddocsOpenapiIr.FullOneOfExample._Visitor<_Result>,
            ) {
                return RapiddocsOpenapiIr.FullOneOfExample._visit(this, visitor);
            },
        };
    },

    undiscriminated: (value: RapiddocsOpenapiIr.FullExample): RapiddocsOpenapiIr.FullOneOfExample.Undiscriminated => {
        return {
            value: value,
            type: "undiscriminated",
            _visit: function <_Result>(
                this: RapiddocsOpenapiIr.FullOneOfExample.Undiscriminated,
                visitor: RapiddocsOpenapiIr.FullOneOfExample._Visitor<_Result>,
            ) {
                return RapiddocsOpenapiIr.FullOneOfExample._visit(this, visitor);
            },
        };
    },

    _visit: <_Result>(
        value: RapiddocsOpenapiIr.FullOneOfExample,
        visitor: RapiddocsOpenapiIr.FullOneOfExample._Visitor<_Result>,
    ): _Result => {
        switch (value.type) {
            case "discriminated":
                return visitor.discriminated(value.value);
            case "undiscriminated":
                return visitor.undiscriminated(value.value);
            default:
                return visitor._other(value as any);
        }
    },
} as const;
