import chalk from "chalk";

import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";
import { RapiddocsFileContext, ResolvedType, TypeResolver } from "@khulnasoft/ir-generator";

import { RuleViolation } from "../../Rule";
import {
    maybeFileFromResolvedType,
    maybePrimitiveType,
    resolveResponseType,
    resolvedTypeHasProperty
} from "../../utils/propertyValidatorUtils";
import { validateRequestProperty, validateResponseProperty, validateResultsProperty } from "./validateUtils";

export function validateCursorPagination({
    endpointId,
    endpoint,
    typeResolver,
    file,
    cursorPagination
}: {
    endpointId: string;
    endpoint: RawSchemas.HttpEndpointSchema;
    typeResolver: TypeResolver;
    file: RapiddocsFileContext;
    cursorPagination: RawSchemas.CursorPaginationSchema;
}): RuleViolation[] {
    const violations: RuleViolation[] = [];

    violations.push(
        ...validateCursorProperty({
            endpointId,
            endpoint,
            typeResolver,
            file,
            cursorPagination
        })
    );

    const resolvedResponseType = resolveResponseType({ endpoint, typeResolver, file });
    if (resolvedResponseType == null) {
        violations.push({
            severity: "fatal",
            message: `Pagination configuration for endpoint ${chalk.bold(endpointId)} must define a response type.`
        });
        return violations;
    }

    violations.push(
        ...validateNextCursorProperty({
            endpointId,
            typeResolver,
            file: maybeFileFromResolvedType(resolvedResponseType) ?? file,
            resolvedResponseType,
            nextProperty: cursorPagination.next_cursor
        })
    );

    violations.push(
        ...validateResultsProperty({
            endpointId,
            typeResolver,
            file: maybeFileFromResolvedType(resolvedResponseType) ?? file,
            resolvedResponseType,
            resultsProperty: cursorPagination.results
        })
    );

    return violations;
}

function validateCursorProperty({
    endpointId,
    endpoint,
    typeResolver,
    file,
    cursorPagination
}: {
    endpointId: string;
    endpoint: RawSchemas.HttpEndpointSchema;
    typeResolver: TypeResolver;
    file: RapiddocsFileContext;
    cursorPagination: RawSchemas.CursorPaginationSchema;
}): RuleViolation[] {
    return validateRequestProperty({
        endpointId,
        endpoint,
        typeResolver,
        file,
        requestProperty: cursorPagination.cursor,
        propertyValidator: {
            propertyID: "cursor",
            validate: isValidCursorType
        }
    });
}

function validateNextCursorProperty({
    endpointId,
    typeResolver,
    file,
    resolvedResponseType,
    nextProperty
}: {
    endpointId: string;
    typeResolver: TypeResolver;
    file: RapiddocsFileContext;
    resolvedResponseType: ResolvedType;
    nextProperty: string;
}): RuleViolation[] {
    return validateResponseProperty({
        endpointId,
        typeResolver,
        file,
        resolvedResponseType,
        responseProperty: nextProperty,
        propertyValidator: {
            propertyID: "next_cursor",
            validate: isValidCursorProperty
        }
    });
}

function isValidCursorProperty({
    typeResolver,
    file,
    resolvedType,
    propertyComponents
}: {
    typeResolver: TypeResolver;
    file: RapiddocsFileContext;
    resolvedType: ResolvedType | undefined;
    propertyComponents: string[];
}): boolean {
    return resolvedTypeHasProperty({
        typeResolver,
        file,
        resolvedType,
        propertyComponents,
        validate: isValidCursorType
    });
}

function isValidCursorType({ resolvedType }: { resolvedType: ResolvedType | undefined }): boolean {
    const primitiveType = maybePrimitiveType(resolvedType);
    if (primitiveType == null) {
        return false;
    }
    return primitiveType !== "BOOLEAN";
}
