import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";

import { ExampleViolation } from "./exampleViolation";

export function getViolationsForMisshapenExample(
    example: RawSchemas.ExampleTypeReferenceSchema,
    expectedTypeIncludingArticle: string
): ExampleViolation[] {
    return [
        {
            message: `Expected example to be ${expectedTypeIncludingArticle}. Example is: ${JSON.stringify(example)}`
        }
    ];
}
