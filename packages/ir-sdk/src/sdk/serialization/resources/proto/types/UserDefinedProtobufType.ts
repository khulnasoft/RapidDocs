/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsIr from "../../../../api/index";
import * as core from "../../../../core";
import { ProtobufFile } from "./ProtobufFile";
import { Name } from "../../commons/types/Name";

export const UserDefinedProtobufType: core.serialization.ObjectSchema<
    serializers.UserDefinedProtobufType.Raw,
    RapiddocsIr.UserDefinedProtobufType
> = core.serialization.objectWithoutOptionalProperties({
    file: ProtobufFile,
    name: Name,
});

export declare namespace UserDefinedProtobufType {
    export interface Raw {
        file: ProtobufFile.Raw;
        name: Name.Raw;
    }
}
