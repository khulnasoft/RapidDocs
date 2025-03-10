/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

/**
 * It is worth noting that RubyGems API keys need to have the "Push rubygem" permission.
 * Ideally it is also permissioned with index and yank rubygem permissions.
 * Additionally if the creator of the API key has MFA enabled, they must be sure to update their MFA
 * settings to not require MFA for API key usage ("UI and gem signin").
 */
export interface RubyGemsOutputLocationSchema {
    url?: string;
    "package-name": string;
    "api-key"?: string;
}
