import chalk from "chalk";

import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";
import { RapiddocsFileContext, TypeResolver } from "@khulnasoft/ir-generator";

import { RuleViolation } from "../../Rule";
import { maybeFileFromResolvedType, resolveResponseType } from "../../utils/propertyValidatorUtils";
import { validateResultsProperty } from "./validateUtils";

export function validateCustomPagination({
    endpointId,
    endpoint,
    typeResolver,
    file,
    customPagination
}: {
    endpointId: string;
    endpoint: RawSchemas.HttpEndpointSchema;
    typeResolver: TypeResolver;
    file: RapiddocsFileContext;
    customPagination: RawSchemas.CustomPaginationSchema;
}): RuleViolation[] {
    const violations: RuleViolation[] = [];

    const resolvedResponseType = resolveResponseType({ endpoint, typeResolver, file });
    if (resolvedResponseType == null) {
        violations.push({
            severity: "fatal",
            message: `Pagination configuration for endpoint ${chalk.bold(endpointId)} must define a response type.`
        });
        return violations;
    }

    violations.push(
        ...validateResultsProperty({
            endpointId,
            typeResolver,
            file: maybeFileFromResolvedType(resolvedResponseType) ?? file,
            resolvedResponseType,
            resultsProperty: customPagination.results
        })
    );

    return violations;
}
