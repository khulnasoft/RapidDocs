/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

export interface GetTokenRequest {
    clientId: string;
    clientSecret: string;
    audience: "https://api.example.com";
    grantType: "client_credentials";
    scope?: string;
}
