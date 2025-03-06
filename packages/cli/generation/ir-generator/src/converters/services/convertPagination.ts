import { assertNever } from "@khulnasoft/core-utils";
import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";
import { Pagination } from "@khulnasoft/ir-sdk";

import { RapiddocsFileContext } from "../../RapiddocsFileContext";
import { PropertyResolver } from "../../resolvers/PropertyResolver";
import { convertCursorPagination } from "./convertCursorPagination";
import { convertCustomPagination } from "./convertCustomPagination";
import { convertOffsetPagination } from "./convertOffsetPagination";
import { getPaginationPropertyComponents } from "./convertPaginationUtils";

export function convertPagination({
    propertyResolver,
    file,
    endpointName,
    endpointSchema
}: {
    propertyResolver: PropertyResolver;
    file: RapiddocsFileContext;
    endpointName: string;
    endpointSchema: RawSchemas.HttpEndpointSchema;
}): Pagination | undefined {
    const endpointPagination =
        typeof endpointSchema.pagination === "boolean" ? file.rootApiFile.pagination : endpointSchema.pagination;
    if (!endpointPagination) {
        return undefined;
    }
    const paginationPropertyComponents = getPaginationPropertyComponents(endpointPagination);
    switch (paginationPropertyComponents.type) {
        case "cursor":
            return convertCursorPagination({
                propertyResolver,
                file,
                endpointName,
                endpointSchema,
                paginationPropertyComponents
            });
        case "offset":
            return convertOffsetPagination({
                propertyResolver,
                file,
                endpointName,
                endpointSchema,
                paginationPropertyComponents
            });
        case "custom":
            return convertCustomPagination({
                propertyResolver,
                file,
                endpointName,
                paginationPropertyComponents
            });
        default:
            assertNever(paginationPropertyComponents);
    }
}
