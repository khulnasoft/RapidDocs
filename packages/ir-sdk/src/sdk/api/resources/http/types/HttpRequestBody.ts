/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as RapiddocsIr from "../../../index";

export type HttpRequestBody =
    | RapiddocsIr.HttpRequestBody.InlinedRequestBody
    | RapiddocsIr.HttpRequestBody.Reference
    | RapiddocsIr.HttpRequestBody.FileUpload
    | RapiddocsIr.HttpRequestBody.Bytes;

export namespace HttpRequestBody {
    export interface InlinedRequestBody extends RapiddocsIr.InlinedRequestBody, _Utils {
        type: "inlinedRequestBody";
    }

    export interface Reference extends RapiddocsIr.HttpRequestBodyReference, _Utils {
        type: "reference";
    }

    export interface FileUpload extends RapiddocsIr.FileUploadRequest, _Utils {
        type: "fileUpload";
    }

    export interface Bytes extends RapiddocsIr.BytesRequest, _Utils {
        type: "bytes";
    }

    export interface _Utils {
        _visit: <_Result>(visitor: RapiddocsIr.HttpRequestBody._Visitor<_Result>) => _Result;
    }

    export interface _Visitor<_Result> {
        inlinedRequestBody: (value: RapiddocsIr.InlinedRequestBody) => _Result;
        reference: (value: RapiddocsIr.HttpRequestBodyReference) => _Result;
        fileUpload: (value: RapiddocsIr.FileUploadRequest) => _Result;
        bytes: (value: RapiddocsIr.BytesRequest) => _Result;
        _other: (value: { type: string }) => _Result;
    }
}

export const HttpRequestBody = {
    inlinedRequestBody: (value: RapiddocsIr.InlinedRequestBody): RapiddocsIr.HttpRequestBody.InlinedRequestBody => {
        return {
            ...value,
            type: "inlinedRequestBody",
            _visit: function <_Result>(
                this: RapiddocsIr.HttpRequestBody.InlinedRequestBody,
                visitor: RapiddocsIr.HttpRequestBody._Visitor<_Result>,
            ) {
                return RapiddocsIr.HttpRequestBody._visit(this, visitor);
            },
        };
    },

    reference: (value: RapiddocsIr.HttpRequestBodyReference): RapiddocsIr.HttpRequestBody.Reference => {
        return {
            ...value,
            type: "reference",
            _visit: function <_Result>(
                this: RapiddocsIr.HttpRequestBody.Reference,
                visitor: RapiddocsIr.HttpRequestBody._Visitor<_Result>,
            ) {
                return RapiddocsIr.HttpRequestBody._visit(this, visitor);
            },
        };
    },

    fileUpload: (value: RapiddocsIr.FileUploadRequest): RapiddocsIr.HttpRequestBody.FileUpload => {
        return {
            ...value,
            type: "fileUpload",
            _visit: function <_Result>(
                this: RapiddocsIr.HttpRequestBody.FileUpload,
                visitor: RapiddocsIr.HttpRequestBody._Visitor<_Result>,
            ) {
                return RapiddocsIr.HttpRequestBody._visit(this, visitor);
            },
        };
    },

    bytes: (value: RapiddocsIr.BytesRequest): RapiddocsIr.HttpRequestBody.Bytes => {
        return {
            ...value,
            type: "bytes",
            _visit: function <_Result>(
                this: RapiddocsIr.HttpRequestBody.Bytes,
                visitor: RapiddocsIr.HttpRequestBody._Visitor<_Result>,
            ) {
                return RapiddocsIr.HttpRequestBody._visit(this, visitor);
            },
        };
    },

    _visit: <_Result>(value: RapiddocsIr.HttpRequestBody, visitor: RapiddocsIr.HttpRequestBody._Visitor<_Result>): _Result => {
        switch (value.type) {
            case "inlinedRequestBody":
                return visitor.inlinedRequestBody(value);
            case "reference":
                return visitor.reference(value);
            case "fileUpload":
                return visitor.fileUpload(value);
            case "bytes":
                return visitor.bytes(value);
            default:
                return visitor._other(value as any);
        }
    },
} as const;
