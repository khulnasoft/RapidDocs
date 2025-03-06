import { InlinedRequestBodyProperty } from "@rapiddocs-rapiddocs/ir-sdk/api";

import { ExpressContext } from "..";
import { GeneratedFile } from "../../commons/GeneratedFile";

export interface GeneratedExpressInlinedRequestBody extends GeneratedFile<ExpressContext> {
    getPropertyKey: (property: InlinedRequestBodyProperty) => string;
}
