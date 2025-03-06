import { assertNever } from "@khulnasoft/core-utils";
import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";
import { ErrorDiscriminationStrategy } from "@khulnasoft/ir-sdk";

import { RapiddocsFileContext } from "../RapiddocsFileContext";

const ERROR_CONTENT_PROPERTY_NAME = "content";

export function convertErrorDiscriminationStrategy(
    rawStrategy: RawSchemas.ErrorDiscriminationSchema | undefined,
    file: RapiddocsFileContext
): ErrorDiscriminationStrategy {
    if (rawStrategy == null || rawStrategy.strategy === "status-code") {
        return ErrorDiscriminationStrategy.statusCode();
    }
    switch (rawStrategy.strategy) {
        case "property":
            return ErrorDiscriminationStrategy.property({
                discriminant: file.casingsGenerator.generateNameAndWireValue({
                    name: rawStrategy["property-name"],
                    wireValue: rawStrategy["property-name"]
                }),
                contentProperty: file.casingsGenerator.generateNameAndWireValue({
                    name: ERROR_CONTENT_PROPERTY_NAME,
                    wireValue: ERROR_CONTENT_PROPERTY_NAME
                })
            });
        default:
            assertNever(rawStrategy);
    }
}
