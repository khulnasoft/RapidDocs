import { DeclaredErrorName, DeclaredServiceName, DeclaredTypeName, RapiddocsFilepath, RapiddocsIr } from "@khulnasoft/ir-sdk";

import { ResolvedEndpoint } from "./resolvers/ResolvedEndpoint";

export const IdGenerator = {
    generateTypeId: (typeName: Omit<DeclaredTypeName, "typeId">): RapiddocsIr.commons.TypeId => {
        const joinedRapiddocsFilePath = stringifyRapiddocsFilepath(typeName.rapiddocsFilepath);
        return `type_${joinedRapiddocsFilePath}:${typeName.name.originalName}`;
    },
    generateErrorId: (errorName: Omit<DeclaredErrorName, "errorId">): RapiddocsIr.commons.TypeId => {
        const joinedRapiddocsFilePath = stringifyRapiddocsFilepath(errorName.rapiddocsFilepath);
        return `error_${joinedRapiddocsFilePath}:${errorName.name.originalName}`;
    },
    generateServiceId: (serviceName: DeclaredServiceName): RapiddocsIr.commons.TypeId => {
        const joinedRapiddocsFilePath = stringifyRapiddocsFilepath(serviceName.rapiddocsFilepath);
        return `service_${joinedRapiddocsFilePath}`;
    },
    generateServiceIdFromRapiddocsFilepath: (rapiddocsFilepath: RapiddocsFilepath): RapiddocsIr.commons.TypeId => {
        const joinedRapiddocsFilePath = stringifyRapiddocsFilepath(rapiddocsFilepath);
        return `service_${joinedRapiddocsFilePath}`;
    },
    generateSubpackageId: (rapiddocsFilepath: RapiddocsFilepath): RapiddocsIr.commons.SubpackageId => {
        const joinedRapiddocsFilePath = stringifyRapiddocsFilepath(rapiddocsFilepath);
        return `subpackage_${joinedRapiddocsFilePath}`;
    },
    generateEndpointId: (
        declaredServiceName: DeclaredServiceName,
        httpEndpoint: Omit<RapiddocsIr.http.HttpEndpoint, "id">
    ): string => {
        const joinedRapiddocsFilePath = stringifyRapiddocsFilepath(declaredServiceName.rapiddocsFilepath);
        const endpointId = httpEndpoint.name.originalName;
        return `endpoint_${joinedRapiddocsFilePath}.${endpointId}`;
    },
    generateEndpointIdFromResolvedEndpoint: (resolvedEndpoint: ResolvedEndpoint): string => {
        const joinedRapiddocsFilePath = stringifyRapiddocsFilepath(resolvedEndpoint.file.rapiddocsFilepath);
        const endpointId = resolvedEndpoint.endpointId;
        return `endpoint_${joinedRapiddocsFilePath}.${endpointId}`;
    },
    generateWebhookGroupId: (rapiddocsFilepath: RapiddocsFilepath): string => {
        const joinedRapiddocsFilePath = stringifyRapiddocsFilepath(rapiddocsFilepath);
        return `webhooks_${joinedRapiddocsFilePath}`;
    },
    generateWebhookId: (rapiddocsFilepath: RapiddocsFilepath, webhookId: string): string => {
        const joinedRapiddocsFilePath = stringifyRapiddocsFilepath(rapiddocsFilepath);
        return `webhooks_${joinedRapiddocsFilePath}.${webhookId}`;
    },
    generateWebSocketChannelId: (rapiddocsFilepath: RapiddocsFilepath): string => {
        const joinedRapiddocsFilePath = stringifyRapiddocsFilepath(rapiddocsFilepath);
        return `channel_${joinedRapiddocsFilePath}`;
    }
};

function stringifyRapiddocsFilepath(rapiddocsFilepath: RapiddocsFilepath): string {
    return rapiddocsFilepath.allParts.map((part) => part.originalName).join("/");
}
