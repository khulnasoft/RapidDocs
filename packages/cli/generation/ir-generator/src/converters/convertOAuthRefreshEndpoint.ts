import { OAuthRefreshEndpoint } from "@khulnasoft/ir-sdk";

import { RapiddocsFileContext } from "../RapiddocsFileContext";
import { IdGenerator } from "../IdGenerator";
import { EndpointResolver } from "../resolvers/EndpointResolver";
import { PropertyResolver } from "../resolvers/PropertyResolver";
import { isRootRapiddocsFilepath } from "../utils/isRootRapiddocsFilepath";
import { RefreshTokenEndpoint } from "./convertOAuthUtils";

export function convertOAuthRefreshEndpoint({
    endpointResolver,
    propertyResolver,
    file,
    refreshTokenEndpoint
}: {
    endpointResolver: EndpointResolver;
    propertyResolver: PropertyResolver;
    file: RapiddocsFileContext;
    refreshTokenEndpoint: RefreshTokenEndpoint;
}): OAuthRefreshEndpoint | undefined {
    const resolvedEndpoint = endpointResolver.resolveEndpointOrThrow({
        endpoint: refreshTokenEndpoint.endpoint,
        file
    });
    return {
        endpointReference: {
            endpointId: IdGenerator.generateEndpointIdFromResolvedEndpoint(resolvedEndpoint),
            serviceId: IdGenerator.generateServiceIdFromRapiddocsFilepath(resolvedEndpoint.file.rapiddocsFilepath),
            subpackageId: !isRootRapiddocsFilepath({ rapiddocsFilePath: resolvedEndpoint.file.rapiddocsFilepath })
                ? IdGenerator.generateSubpackageId(resolvedEndpoint.file.rapiddocsFilepath)
                : undefined
        },
        requestProperties: {
            refreshToken: propertyResolver.resolveRequestPropertyOrThrow({
                file,
                endpoint: refreshTokenEndpoint.endpoint,
                propertyComponents: refreshTokenEndpoint.requestProperties.refresh_token
            })
        },
        responseProperties: {
            accessToken: propertyResolver.resolveResponsePropertyOrThrow({
                file,
                endpoint: refreshTokenEndpoint.endpoint,
                propertyComponents: refreshTokenEndpoint.responseProperties.access_token
            }),
            expiresIn:
                refreshTokenEndpoint.responseProperties.expires_in != null
                    ? propertyResolver.resolveResponsePropertyOrThrow({
                          file,
                          endpoint: refreshTokenEndpoint.endpoint,
                          propertyComponents: refreshTokenEndpoint.responseProperties.expires_in
                      })
                    : undefined,
            refreshToken:
                refreshTokenEndpoint.responseProperties.refresh_token != null
                    ? propertyResolver.resolveResponsePropertyOrThrow({
                          file,
                          endpoint: refreshTokenEndpoint.endpoint,
                          propertyComponents: refreshTokenEndpoint.responseProperties.refresh_token
                      })
                    : undefined
        }
    };
}
