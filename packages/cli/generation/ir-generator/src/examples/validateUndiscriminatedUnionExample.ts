import { RapiddocsWorkspace } from "@khulnasoft/api-workspace-commons";
import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";

import { RapiddocsFileContext } from "../RapiddocsFileContext";
import { ExampleResolver } from "../resolvers/ExampleResolver";
import { TypeResolver } from "../resolvers/TypeResolver";
import { ExampleViolation } from "./exampleViolation";
import { validateTypeReferenceExample } from "./validateTypeReferenceExample";

export function validateUndiscriminatedUnionExample({
    rawUnion,
    example,
    typeResolver,
    exampleResolver,
    file,
    workspace,
    breadcrumbs,
    depth
}: {
    rawUnion: RawSchemas.UndiscriminatedUnionSchema;
    example: RawSchemas.ExampleTypeValueSchema;
    typeResolver: TypeResolver;
    exampleResolver: ExampleResolver;
    file: RapiddocsFileContext;
    workspace: RapiddocsWorkspace;
    breadcrumbs: string[];
    depth: number;
}): ExampleViolation[] {
    const violations: ExampleViolation[] = [];
    for (const member of rawUnion.union) {
        const violationsForMember = validateTypeReferenceExample({
            rawTypeReference: typeof member === "string" ? member : member.type,
            example,
            typeResolver,
            exampleResolver,
            file,
            workspace,
            breadcrumbs,
            depth: depth + 1
        });
        if (violationsForMember.length === 0) {
            return [];
        } else if (violations.length === 0) {
            violations.push(...violationsForMember);
        }
    }
    return violations;
}
