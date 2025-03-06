import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";

import { RapiddocsFileContext } from "../RapiddocsFileContext";

export interface ResolvedEndpoint {
    endpointId: string;
    endpoint: RawSchemas.HttpEndpointSchema;
    file: RapiddocsFileContext;
}
