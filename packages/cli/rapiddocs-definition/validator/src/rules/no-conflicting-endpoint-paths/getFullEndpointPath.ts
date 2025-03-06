import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";

export function getFullEndpointPath({
    service,
    endpoint
}: {
    service: RawSchemas.HttpServiceSchema;
    endpoint: RawSchemas.HttpEndpointSchema;
}): string {
    return service["base-path"] + endpoint.path;
}
