/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as RapiddocsDocsConfig from "../../../index";

export interface ApiReferencePackageConfigurationWithOptions
    extends RapiddocsDocsConfig.WithPermissions,
        RapiddocsDocsConfig.WithFeatureFlags {
    title?: string;
    /** Relative path to the markdown file. This summary is displayed at the top of the API section. */
    summary?: string;
    contents?: RapiddocsDocsConfig.ApiReferenceLayoutItem[];
    slug?: string;
    icon?: string;
    hidden?: boolean;
    skipSlug?: boolean;
    /** Settings for the api playground that is applied only to descendants of this api package. */
    playground?: RapiddocsDocsConfig.PlaygroundSettings;
}
