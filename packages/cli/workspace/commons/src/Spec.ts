import { ParseOpenAPIOptions } from "@khulnasoft/openapi-ir-parser";
import { AbsoluteFilePath, RelativeFilePath } from "@khulnasoft/path-utils";

import { Source } from "./Source";

export type Spec = OpenAPISpec | ProtobufSpec;

export interface OpenAPISpec {
    type: "openapi";
    absoluteFilepath: AbsoluteFilePath;
    absoluteFilepathToOverrides: AbsoluteFilePath | undefined;
    source: Source;
    namespace?: string;
    settings?: ParseOpenAPIOptions;
}

export interface ProtobufSpec {
    type: "protobuf";
    absoluteFilepathToProtobufRoot: AbsoluteFilePath;
    absoluteFilepathToProtobufTarget: AbsoluteFilePath;
    absoluteFilepathToOverrides: AbsoluteFilePath | undefined;
    relativeFilepathToProtobufRoot: RelativeFilePath;
    generateLocally: boolean;
    settings?: ParseOpenAPIOptions;
}
