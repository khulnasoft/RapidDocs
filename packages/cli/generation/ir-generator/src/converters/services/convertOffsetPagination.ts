import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";
import { Pagination } from "@khulnasoft/ir-sdk";

import { RapiddocsFileContext } from "../../RapiddocsFileContext";
import { PropertyResolver } from "../../resolvers/PropertyResolver";
import { OffsetPaginationPropertyComponents } from "./convertPaginationUtils";

export function convertOffsetPagination({
    propertyResolver,
    file,
    endpointName,
    endpointSchema,
    paginationPropertyComponents
}: {
    propertyResolver: PropertyResolver;
    file: RapiddocsFileContext;
    endpointName: string;
    endpointSchema: RawSchemas.HttpEndpointSchema;
    paginationPropertyComponents: OffsetPaginationPropertyComponents;
}): Pagination | undefined {
    return Pagination.offset({
        page: propertyResolver.resolveRequestPropertyOrThrow({
            file,
            endpoint: endpointName,
            propertyComponents: paginationPropertyComponents.offset
        }),
        results: propertyResolver.resolveResponsePropertyOrThrow({
            file,
            endpoint: endpointName,
            propertyComponents: paginationPropertyComponents.results
        }),
        step:
            paginationPropertyComponents.step != null
                ? propertyResolver.resolveRequestPropertyOrThrow({
                      file,
                      endpoint: endpointName,
                      propertyComponents: paginationPropertyComponents.step
                  })
                : undefined,
        hasNextPage:
            paginationPropertyComponents.hasNextPage != null
                ? propertyResolver.resolveResponsePropertyOrThrow({
                      file,
                      endpoint: endpointName,
                      propertyComponents: paginationPropertyComponents.hasNextPage
                  })
                : undefined
    });
}
