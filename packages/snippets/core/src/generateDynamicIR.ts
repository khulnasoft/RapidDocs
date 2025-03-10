import { Audiences, generatorsYml } from "@khulnasoft/configuration";
import { generateIntermediateRepresentation } from "@khulnasoft/ir-generator";
import { dynamic } from "@khulnasoft/ir-sdk";
import { NopSourceResolver } from "@khulnasoft/source-resolver";

import { Spec } from "./Spec";
import { convertSpecToWorkspace } from "./utils/convertSpecToWorkspace";
import { createTaskContext } from "./utils/createTaskContext";

export function generateDynamicIR({
    spec,
    language,
    generatorsConfiguration,
    audiences,
    keywords,
    smartCasing
}: {
    spec: Spec;
    language: generatorsYml.GenerationLanguage;
    generatorsConfiguration?: generatorsYml.GeneratorsConfiguration;
    audiences?: Audiences;
    keywords?: string[];
    smartCasing?: boolean;
}): dynamic.DynamicIntermediateRepresentation {
    const context = createTaskContext();
    const workspace = convertSpecToWorkspace({ context, spec, generatorsConfiguration });
    const ir = generateIntermediateRepresentation({
        context,
        workspace,
        generationLanguage: language,
        audiences: audiences ?? { type: "all" },
        keywords,
        sourceResolver: new NopSourceResolver(),
        smartCasing: smartCasing ?? false,
        exampleGeneration: { disabled: true },
        version: undefined,
        packageName: undefined,
        readme: undefined
    });
    if (ir.dynamic == null) {
        throw new Error("Internal error; failed to generate dynamic intermediate representation");
    }
    return ir.dynamic;
}
