import { JavaScriptRuntime } from "@rapiddocs-typescript/commons";

import { SdkGeneratorCli } from "./SdkGeneratorCli";

void new SdkGeneratorCli({ targetRuntime: JavaScriptRuntime.NODE }).runCli();
