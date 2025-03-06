import { readFile } from "fs/promises";

import { isOpenAPIV2 } from "@khulnasoft/api-workspace-commons";
import { relative } from "@khulnasoft/fs-utils";
import { convertOpenAPIV2ToV3, loadOpenAPI } from "@khulnasoft/lazy-rapiddocs-workspace";

import { Rule } from "../../Rule";
import { ValidationViolation } from "../../ValidationViolation";

export const NoDuplicateOverridesRule: Rule = {
    name: "no-duplicate-overrides",
    run: async ({ workspace, specs, context }) => {
        const violations: ValidationViolation[] = [];
        const seenMethodNames = new Set<string>();
        const seenGroupNames = new Set<string>();

        for (const spec of specs) {
            const contents = (await readFile(spec.absoluteFilepath)).toString();

            if (contents.includes("openapi") || contents.includes("swagger")) {
                const openAPI = await loadOpenAPI({
                    absolutePathToOpenAPI: spec.absoluteFilepath,
                    context,
                    absolutePathToOpenAPIOverrides: spec.absoluteFilepathToOverrides
                });

                const apiToValidate = isOpenAPIV2(openAPI) ? await convertOpenAPIV2ToV3(openAPI) : openAPI;

                for (const [path, pathItem] of Object.entries(apiToValidate.paths ?? {})) {
                    for (const [method, operation] of Object.entries(pathItem ?? {})) {
                        if (method === "parameters" || method === "$ref") {
                            continue;
                        }

                        const operationObj = operation as {
                            "x-rapiddocs-sdk-group-name"?: string | string[];
                            "x-rapiddocs-sdk-method-name"?: string;
                        };
                        const rawSdkGroupName = operationObj?.["x-rapiddocs-sdk-group-name"];
                        const sdkGroupName = Array.isArray(rawSdkGroupName)
                            ? rawSdkGroupName.join(".")
                            : rawSdkGroupName;
                        const sdkMethodName = operationObj?.["x-rapiddocs-sdk-method-name"];

                        if (sdkGroupName && sdkMethodName) {
                            const key = `${sdkGroupName}:${sdkMethodName}`;
                            if (seenMethodNames.has(key)) {
                                violations.push({
                                    severity: "fatal",
                                    relativeFilepath: relative(workspace.absoluteFilePath, spec.source.file),
                                    nodePath: ["paths", path, method],
                                    message: `SDK method ${sdkGroupName}.${sdkMethodName} already exists (x-rapiddocs-sdk-group-name: ${sdkGroupName}, x-rapiddocs-sdk-method-name: ${sdkMethodName})`
                                });
                            }
                            seenMethodNames.add(key);
                        }
                    }
                }
            }
        }
        return violations;
    }
};
