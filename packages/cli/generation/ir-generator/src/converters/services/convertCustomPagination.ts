import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";
import { Pagination } from "@khulnasoft/ir-sdk";

import { RapiddocsFileContext } from "../../RapiddocsFileContext";
import { PropertyResolver } from "../../resolvers/PropertyResolver";
import { CustomPaginationPropertyComponents } from "./convertPaginationUtils";

export function convertCustomPagination({
    propertyResolver,
    file,
    endpointName,
    paginationPropertyComponents
}: {
    propertyResolver: PropertyResolver;
    file: RapiddocsFileContext;
    endpointName: string;
    paginationPropertyComponents: CustomPaginationPropertyComponents;
}): Pagination | undefined {
    return Pagination.custom({
        results: propertyResolver.resolveResponsePropertyOrThrow({
            file,
            endpoint: endpointName,
            propertyComponents: paginationPropertyComponents.results
        })
    });
}
