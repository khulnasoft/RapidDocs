/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as RapiddocsOpenapiIr from "../../../index";

export type Request = RapiddocsOpenapiIr.Request.OctetStream | RapiddocsOpenapiIr.Request.Multipart | RapiddocsOpenapiIr.Request.Json;

export namespace Request {
    export interface OctetStream extends RapiddocsOpenapiIr.OctetStreamRequest, _Utils {
        type: "octetStream";
    }

    export interface Multipart extends RapiddocsOpenapiIr.MultipartRequest, _Utils {
        type: "multipart";
    }

    export interface Json extends RapiddocsOpenapiIr.JsonRequest, _Utils {
        type: "json";
    }

    export interface _Utils {
        _visit: <_Result>(visitor: RapiddocsOpenapiIr.Request._Visitor<_Result>) => _Result;
    }

    export interface _Visitor<_Result> {
        octetStream: (value: RapiddocsOpenapiIr.OctetStreamRequest) => _Result;
        multipart: (value: RapiddocsOpenapiIr.MultipartRequest) => _Result;
        json: (value: RapiddocsOpenapiIr.JsonRequest) => _Result;
        _other: (value: { type: string }) => _Result;
    }
}

export const Request = {
    octetStream: (value: RapiddocsOpenapiIr.OctetStreamRequest): RapiddocsOpenapiIr.Request.OctetStream => {
        return {
            ...value,
            type: "octetStream",
            _visit: function <_Result>(
                this: RapiddocsOpenapiIr.Request.OctetStream,
                visitor: RapiddocsOpenapiIr.Request._Visitor<_Result>,
            ) {
                return RapiddocsOpenapiIr.Request._visit(this, visitor);
            },
        };
    },

    multipart: (value: RapiddocsOpenapiIr.MultipartRequest): RapiddocsOpenapiIr.Request.Multipart => {
        return {
            ...value,
            type: "multipart",
            _visit: function <_Result>(
                this: RapiddocsOpenapiIr.Request.Multipart,
                visitor: RapiddocsOpenapiIr.Request._Visitor<_Result>,
            ) {
                return RapiddocsOpenapiIr.Request._visit(this, visitor);
            },
        };
    },

    json: (value: RapiddocsOpenapiIr.JsonRequest): RapiddocsOpenapiIr.Request.Json => {
        return {
            ...value,
            type: "json",
            _visit: function <_Result>(
                this: RapiddocsOpenapiIr.Request.Json,
                visitor: RapiddocsOpenapiIr.Request._Visitor<_Result>,
            ) {
                return RapiddocsOpenapiIr.Request._visit(this, visitor);
            },
        };
    },

    _visit: <_Result>(value: RapiddocsOpenapiIr.Request, visitor: RapiddocsOpenapiIr.Request._Visitor<_Result>): _Result => {
        switch (value.type) {
            case "octetStream":
                return visitor.octetStream(value);
            case "multipart":
                return visitor.multipart(value);
            case "json":
                return visitor.json(value);
            default:
                return visitor._other(value as any);
        }
    },
} as const;
