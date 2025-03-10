/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as RapiddocsDefinition from "../../../index";

export interface OAuthRefreshTokenEndpointSchema {
    /** The endpoint to refresh the access token, such as 'auth.refresh_token */
    endpoint: string;
    "request-properties"?: RapiddocsDefinition.OAuthRefreshTokenRequestPropertiesSchema;
    "response-properties"?: RapiddocsDefinition.OAuthRefreshTokenResponsePropertiesSchema;
}
