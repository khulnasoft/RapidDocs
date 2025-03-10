/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as RapiddocsDocsConfig from "../../../index";

export interface PageConfiguration extends RapiddocsDocsConfig.WithPermissions, RapiddocsDocsConfig.WithFeatureFlags {
    page: string;
    path: string;
    slug?: string;
    icon?: string;
    hidden?: boolean;
    noindex?: boolean;
}
