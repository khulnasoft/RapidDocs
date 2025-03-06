import { RapiddocsNavigation } from "@khulnasoft/fdr-sdk";

import { mergeEndpointPairs } from "./mergeEndpointPairs";

export function mergeAndFilterChildren<EndpointType extends { method: string }>({
    left,
    right,
    findEndpointById,
    stringifyEndpointPathParts,
    disableEndpointPairs,
    apiDefinitionId
}: {
    left: RapiddocsNavigation.V1.ApiPackageChild[];
    right: RapiddocsNavigation.V1.ApiPackageChild[];
    findEndpointById: (endpointId: RapiddocsNavigation.EndpointId) => EndpointType | undefined;
    stringifyEndpointPathParts: (endpoint: EndpointType) => string;
    disableEndpointPairs: boolean;
    apiDefinitionId: RapiddocsNavigation.V1.ApiDefinitionId;
}): RapiddocsNavigation.V1.ApiPackageChild[] {
    return mergeEndpointPairs({
        children: [...left, ...right],
        findEndpointById,
        stringifyEndpointPathParts,
        disableEndpointPairs,
        apiDefinitionId
    }).filter((child) => (child.type === "apiPackage" ? child.children.length > 0 : true));
}
