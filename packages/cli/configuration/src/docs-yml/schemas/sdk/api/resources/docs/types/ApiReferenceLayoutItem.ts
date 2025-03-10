/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as RapiddocsDocsConfig from "../../../index";

/**
 * Use the `layout` object to customize the order that your API endpoints
 * are displayed in the docs site.
 */
export type ApiReferenceLayoutItem =
    /**
     * This should be either an endpoint, websocket, webhook, or subpackage ID */
    | string
    /**
     * Keyed by subpackage name, this object allows you to group endpoints and pages together. */
    | Record<string, RapiddocsDocsConfig.ApiReferencePackageConfiguration>
    | RapiddocsDocsConfig.ApiReferenceSectionConfiguration
    | RapiddocsDocsConfig.ApiReferenceEndpointConfiguration
    | RapiddocsDocsConfig.PageConfiguration
    | RapiddocsDocsConfig.LinkConfiguration;
