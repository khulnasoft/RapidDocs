/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as RapiddocsIr from "../../../index";

export type StreamingResponse =
    | RapiddocsIr.StreamingResponse.Json
    | RapiddocsIr.StreamingResponse.Text
    | RapiddocsIr.StreamingResponse.Sse;

export namespace StreamingResponse {
    export interface Json extends RapiddocsIr.JsonStreamChunk, _Utils {
        type: "json";
    }

    export interface Text extends RapiddocsIr.TextStreamChunk, _Utils {
        type: "text";
    }

    export interface Sse extends RapiddocsIr.SseStreamChunk, _Utils {
        type: "sse";
    }

    export interface _Utils {
        _visit: <_Result>(visitor: RapiddocsIr.StreamingResponse._Visitor<_Result>) => _Result;
    }

    export interface _Visitor<_Result> {
        json: (value: RapiddocsIr.JsonStreamChunk) => _Result;
        text: (value: RapiddocsIr.TextStreamChunk) => _Result;
        sse: (value: RapiddocsIr.SseStreamChunk) => _Result;
        _other: (value: { type: string }) => _Result;
    }
}

export const StreamingResponse = {
    json: (value: RapiddocsIr.JsonStreamChunk): RapiddocsIr.StreamingResponse.Json => {
        return {
            ...value,
            type: "json",
            _visit: function <_Result>(
                this: RapiddocsIr.StreamingResponse.Json,
                visitor: RapiddocsIr.StreamingResponse._Visitor<_Result>,
            ) {
                return RapiddocsIr.StreamingResponse._visit(this, visitor);
            },
        };
    },

    text: (value: RapiddocsIr.TextStreamChunk): RapiddocsIr.StreamingResponse.Text => {
        return {
            ...value,
            type: "text",
            _visit: function <_Result>(
                this: RapiddocsIr.StreamingResponse.Text,
                visitor: RapiddocsIr.StreamingResponse._Visitor<_Result>,
            ) {
                return RapiddocsIr.StreamingResponse._visit(this, visitor);
            },
        };
    },

    sse: (value: RapiddocsIr.SseStreamChunk): RapiddocsIr.StreamingResponse.Sse => {
        return {
            ...value,
            type: "sse",
            _visit: function <_Result>(
                this: RapiddocsIr.StreamingResponse.Sse,
                visitor: RapiddocsIr.StreamingResponse._Visitor<_Result>,
            ) {
                return RapiddocsIr.StreamingResponse._visit(this, visitor);
            },
        };
    },

    _visit: <_Result>(
        value: RapiddocsIr.StreamingResponse,
        visitor: RapiddocsIr.StreamingResponse._Visitor<_Result>,
    ): _Result => {
        switch (value.type) {
            case "json":
                return visitor.json(value);
            case "text":
                return visitor.text(value);
            case "sse":
                return visitor.sse(value);
            default:
                return visitor._other(value as any);
        }
    },
} as const;
