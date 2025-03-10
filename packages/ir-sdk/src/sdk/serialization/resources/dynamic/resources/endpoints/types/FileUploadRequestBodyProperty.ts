/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as RapiddocsIr from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { NameAndWireValue } from "../../../../commons/types/NameAndWireValue";
import { NamedParameter } from "../../types/types/NamedParameter";

export const FileUploadRequestBodyProperty: core.serialization.Schema<
    serializers.dynamic.FileUploadRequestBodyProperty.Raw,
    RapiddocsIr.dynamic.FileUploadRequestBodyProperty
> = core.serialization
    .union("type", {
        file: NameAndWireValue,
        fileArray: NameAndWireValue,
        bodyProperty: NamedParameter,
    })
    .transform<RapiddocsIr.dynamic.FileUploadRequestBodyProperty>({
        transform: (value) => {
            switch (value.type) {
                case "file":
                    return RapiddocsIr.dynamic.FileUploadRequestBodyProperty.file(value);
                case "fileArray":
                    return RapiddocsIr.dynamic.FileUploadRequestBodyProperty.fileArray(value);
                case "bodyProperty":
                    return RapiddocsIr.dynamic.FileUploadRequestBodyProperty.bodyProperty(value);
                default:
                    return value as RapiddocsIr.dynamic.FileUploadRequestBodyProperty;
            }
        },
        untransform: ({ _visit, ...value }) => value as any,
    });

export declare namespace FileUploadRequestBodyProperty {
    export type Raw =
        | FileUploadRequestBodyProperty.File
        | FileUploadRequestBodyProperty.FileArray
        | FileUploadRequestBodyProperty.BodyProperty;

    export interface File extends NameAndWireValue.Raw {
        type: "file";
    }

    export interface FileArray extends NameAndWireValue.Raw {
        type: "fileArray";
    }

    export interface BodyProperty extends NamedParameter.Raw {
        type: "bodyProperty";
    }
}
