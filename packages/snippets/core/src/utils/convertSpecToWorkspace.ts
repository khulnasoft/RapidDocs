import { RapiddocsWorkspace } from "@khulnasoft/api-workspace-commons";
import { OpenAPIWorkspace } from "@khulnasoft/browser-compatible-rapiddocs-workspace";
import { generatorsYml } from "@khulnasoft/configuration";
import { TaskContext } from "@khulnasoft/task-context";

import { Spec } from "../Spec";

export function convertSpecToWorkspace({
    context,
    spec,
    generatorsConfiguration
}: {
    context: TaskContext;
    spec: Spec;
    generatorsConfiguration: generatorsYml.GeneratorsConfiguration | undefined;
}): RapiddocsWorkspace {
    switch (spec.type) {
        case "openapi": {
            const openapi = new OpenAPIWorkspace({
                spec: {
                    parsed: spec.openapi,
                    overrides: spec.overrides,
                    settings: spec.settings
                },
                generatorsConfiguration
            });
            return openapi.toRapiddocsWorkspace(
                {
                    context
                },
                spec.settings
            );
        }
    }
}
