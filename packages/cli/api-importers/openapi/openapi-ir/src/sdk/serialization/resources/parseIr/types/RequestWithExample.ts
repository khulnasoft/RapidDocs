/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsOpenapiIr from "../../../../api/index";
import * as core from "../../../../core";
import { OctetStreamRequest } from "../../finalIr/types/OctetStreamRequest";
import { MultipartRequest } from "../../finalIr/types/MultipartRequest";
import { JsonRequestWithExample } from "./JsonRequestWithExample";

export const RequestWithExample: core.serialization.Schema<
    serializers.RequestWithExample.Raw,
    RapiddocsOpenapiIr.RequestWithExample
> = core.serialization
    .union("type", {
        octetStream: OctetStreamRequest,
        multipart: MultipartRequest,
        json: JsonRequestWithExample,
    })
    .transform<RapiddocsOpenapiIr.RequestWithExample>({
        transform: (value) => {
            switch (value.type) {
                case "octetStream":
                    return RapiddocsOpenapiIr.RequestWithExample.octetStream(value);
                case "multipart":
                    return RapiddocsOpenapiIr.RequestWithExample.multipart(value);
                case "json":
                    return RapiddocsOpenapiIr.RequestWithExample.json(value);
                default:
                    return value as RapiddocsOpenapiIr.RequestWithExample;
            }
        },
        untransform: ({ _visit, ...value }) => value as any,
    });

export declare namespace RequestWithExample {
    export type Raw = RequestWithExample.OctetStream | RequestWithExample.Multipart | RequestWithExample.Json;

    export interface OctetStream extends OctetStreamRequest.Raw {
        type: "octetStream";
    }

    export interface Multipart extends MultipartRequest.Raw {
        type: "multipart";
    }

    export interface Json extends JsonRequestWithExample.Raw {
        type: "json";
    }
}
