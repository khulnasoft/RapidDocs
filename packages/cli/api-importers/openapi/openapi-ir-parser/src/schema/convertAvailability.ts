import { OpenAPIV3 } from "openapi-types";

import { Availability } from "@khulnasoft/openapi-ir";

import { getExtension } from "../getExtension";
import { RapiddocsOpenAPIExtension } from "../openapi/v3/extensions/rapiddocsExtensions";
import { isReferenceObject } from "./utils/isReferenceObject";

/**
 * Converts availability information from the OpenAPI schema to the OpenAPI IR.
 *
 * @param propertySchema Represents an object that can be a reference or a schema object that can be deprecated.
 */
export function convertAvailability(
    propertySchema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject
): Availability | undefined {
    // Check X-Rapiddocs-Availability extension first
    switch (getExtension<string>(propertySchema, RapiddocsOpenAPIExtension.AVAILABILITY)) {
        case "deprecated":
            return Availability.Deprecated;
        case "beta":
            return Availability.Beta;
        case "generally-available":
            return Availability.GenerallyAvailable;
        default:
            break;
    }

    // Check deprecated property next
    if (!isReferenceObject(propertySchema) && propertySchema.deprecated) {
        return Availability.Deprecated;
    }

    // return undefined if no availability information is found
    return undefined;
}
