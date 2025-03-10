/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsDocsConfig from "../../../../api/index";
import * as core from "../../../../core";
import { ChangelogFolderRelativePath } from "./ChangelogFolderRelativePath";
import { WithPermissions } from "./WithPermissions";
import { WithFeatureFlags } from "./WithFeatureFlags";

export const TabConfig: core.serialization.ObjectSchema<serializers.TabConfig.Raw, RapiddocsDocsConfig.TabConfig> =
    core.serialization
        .object({
            displayName: core.serialization.property("display-name", core.serialization.string()),
            icon: core.serialization.string().optional(),
            slug: core.serialization.string().optional(),
            skipSlug: core.serialization.property("skip-slug", core.serialization.boolean().optional()),
            hidden: core.serialization.boolean().optional(),
            href: core.serialization.string().optional(),
            changelog: ChangelogFolderRelativePath.optional(),
        })
        .extend(WithPermissions)
        .extend(WithFeatureFlags);

export declare namespace TabConfig {
    export interface Raw extends WithPermissions.Raw, WithFeatureFlags.Raw {
        "display-name": string;
        icon?: string | null;
        slug?: string | null;
        "skip-slug"?: boolean | null;
        hidden?: boolean | null;
        href?: string | null;
        changelog?: ChangelogFolderRelativePath.Raw | null;
    }
}
