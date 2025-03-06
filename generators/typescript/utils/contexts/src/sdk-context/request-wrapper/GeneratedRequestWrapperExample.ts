import { GetReferenceOpts } from "@rapiddocs-typescript/commons";
import { ts } from "ts-morph";

import { SdkContext } from "..";

export interface GeneratedRequestWrapperExample {
    build: (context: SdkContext, opts: GetReferenceOpts) => ts.Expression;
}
