import { RapiddocsWorkspace } from "@khulnasoft/api-workspace-commons";
import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";

import { RapiddocsFileContext } from "../RapiddocsFileContext";
import { ExampleResolver } from "../resolvers/ExampleResolver";
import { TypeResolver } from "../resolvers/TypeResolver";
import { ExampleViolation } from "./exampleViolation";
import { validateTypeReferenceExample } from "./validateTypeReferenceExample";

export function validateAliasExample({
    rawAlias,
    example,
    file,
    typeResolver,
    exampleResolver,
    workspace,
    breadcrumbs,
    depth
}: {
    rawAlias: string | RawSchemas.AliasSchema;
    example: RawSchemas.ExampleTypeValueSchema;
    file: RapiddocsFileContext;
    typeResolver: TypeResolver;
    exampleResolver: ExampleResolver;
    workspace: RapiddocsWorkspace;
    breadcrumbs: string[];
    depth: number;
}): ExampleViolation[] {
    return validateTypeReferenceExample({
        rawTypeReference: typeof rawAlias === "string" ? rawAlias : rawAlias.type,
        example,
        file,
        typeResolver,
        exampleResolver,
        workspace,
        breadcrumbs,
        depth: depth + 1
    });
}
