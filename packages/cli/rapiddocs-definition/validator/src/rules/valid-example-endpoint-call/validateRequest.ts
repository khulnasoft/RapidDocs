import { RapiddocsWorkspace } from "@khulnasoft/api-workspace-commons";
import { RawSchemas, isInlineRequestBody } from "@khulnasoft/rapiddocs-definition-schema";
import { ExampleResolver, ExampleValidators, RapiddocsFileContext, TypeResolver } from "@khulnasoft/ir-generator";

import { RuleViolation } from "../../Rule";

export function validateRequest({
    example,
    endpoint,
    typeResolver,
    exampleResolver,
    file,
    workspace
}: {
    example: RawSchemas.ExampleTypeReferenceSchema | undefined;
    endpoint: RawSchemas.HttpEndpointSchema;
    typeResolver: TypeResolver;
    exampleResolver: ExampleResolver;
    file: RapiddocsFileContext;
    workspace: RapiddocsWorkspace;
}): RuleViolation[] {
    const violations: RuleViolation[] = [];

    const body = typeof endpoint.request !== "string" ? endpoint.request?.body : endpoint.request;

    if (body == null) {
        if (example != null) {
            violations.push({
                severity: "fatal",
                message: "Unexpected request in example."
            });
        }
    } else if (isInlineRequestBody(body)) {
        violations.push(
            ...ExampleValidators.validateObjectExample({
                typeName: undefined,
                typeNameForBreadcrumb: "<Inlined Request>",
                rawObject: {
                    "extra-properties": body["extra-properties"],
                    extends: body.extends,
                    properties: body.properties ?? {}
                },
                file,
                typeResolver,
                exampleResolver,
                workspace,
                example,
                breadcrumbs: ["request"],
                depth: 0
            }).map((val): RuleViolation => {
                return { severity: "fatal", message: val.message };
            })
        );
    } else {
        violations.push(
            ...ExampleValidators.validateTypeReferenceExample({
                rawTypeReference: typeof body === "string" ? body : body.type,
                example,
                file,
                workspace,
                typeResolver,
                exampleResolver,
                breadcrumbs: ["response", "body"],
                depth: 0
            }).map((val): RuleViolation => {
                return { severity: "fatal", message: val.message };
            })
        );
    }

    return violations;
}
