/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as RapiddocsDefinition from "../../../../../index";

export interface OAuthSchemeSchema extends RapiddocsDefinition.rapiddocsDefinition.WithDocsSchema {
    scheme: "oauth";
    type: "client-credentials";
    scopes?: string[];
    "client-id-env"?: string;
    "client-secret-env"?: string;
    /** Sets the token header value prefix. Defaults to 'Bearer' */
    "token-prefix"?: string;
    /** Sets the token header key name. Defaults to 'Authorization' */
    "token-header"?: string;
    "get-token": RapiddocsDefinition.rapiddocsDefinition.OAuthGetTokenEndpointSchema;
    "refresh-token"?: RapiddocsDefinition.rapiddocsDefinition.OAuthRefreshTokenEndpointSchema;
}
