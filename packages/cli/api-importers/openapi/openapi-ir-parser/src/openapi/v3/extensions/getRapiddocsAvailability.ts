import { OpenAPIV3 } from "openapi-types";

import { Availability } from "@khulnasoft/openapi-ir";

import { getExtension } from "../../../getExtension";
import { RapiddocsOpenAPIExtension } from "./rapiddocsExtensions";

export interface BasicSecuritySchemeNames {
    usernameVariable?: string;
    passwordVariable?: string;
}

export function getRapiddocsAvailability(operationObject: OpenAPIV3.OperationObject): undefined | Availability {
    const availability = getExtension<string>(operationObject, RapiddocsOpenAPIExtension.AVAILABILITY);
    if (availability === "ga" || availability === "generally-available") {
        return Availability.GenerallyAvailable;
    } else if (availability === "beta" || availability === "pre-release") {
        return Availability.Beta;
    } else if (availability === "deprecated") {
        return Availability.Deprecated;
    }
    if (operationObject.deprecated) {
        return Availability.Deprecated;
    }
    return undefined;
}
