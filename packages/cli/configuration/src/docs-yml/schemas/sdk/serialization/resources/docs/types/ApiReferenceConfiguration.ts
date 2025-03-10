/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsDocsConfig from "../../../../api/index";
import * as core from "../../../../core";
import { AudienceId } from "./AudienceId";
import { SnippetsConfiguration } from "./SnippetsConfiguration";
import { PlaygroundSettings } from "./PlaygroundSettings";
import { WithPermissions } from "./WithPermissions";
import { WithFeatureFlags } from "./WithFeatureFlags";

export const ApiReferenceConfiguration: core.serialization.ObjectSchema<
    serializers.ApiReferenceConfiguration.Raw,
    RapiddocsDocsConfig.ApiReferenceConfiguration
> = core.serialization
    .object({
        api: core.serialization.string(),
        apiName: core.serialization.property("api-name", core.serialization.string().optional()),
        openrpc: core.serialization.string().optional(),
        audiences: core.serialization.list(AudienceId).optional(),
        displayErrors: core.serialization.property("display-errors", core.serialization.boolean().optional()),
        snippets: SnippetsConfiguration.optional(),
        summary: core.serialization.string().optional(),
        layout: core.serialization.list(core.serialization.lazy(() => serializers.ApiReferenceLayoutItem)).optional(),
        icon: core.serialization.string().optional(),
        slug: core.serialization.string().optional(),
        hidden: core.serialization.boolean().optional(),
        skipSlug: core.serialization.property("skip-slug", core.serialization.boolean().optional()),
        alphabetized: core.serialization.boolean().optional(),
        flattened: core.serialization.boolean().optional(),
        paginated: core.serialization.boolean().optional(),
        playground: PlaygroundSettings.optional(),
    })
    .extend(WithPermissions)
    .extend(WithFeatureFlags);

export declare namespace ApiReferenceConfiguration {
    export interface Raw extends WithPermissions.Raw, WithFeatureFlags.Raw {
        api: string;
        "api-name"?: string | null;
        openrpc?: string | null;
        audiences?: AudienceId.Raw[] | null;
        "display-errors"?: boolean | null;
        snippets?: SnippetsConfiguration.Raw | null;
        summary?: string | null;
        layout?: serializers.ApiReferenceLayoutItem.Raw[] | null;
        icon?: string | null;
        slug?: string | null;
        hidden?: boolean | null;
        "skip-slug"?: boolean | null;
        alphabetized?: boolean | null;
        flattened?: boolean | null;
        paginated?: boolean | null;
        playground?: PlaygroundSettings.Raw | null;
    }
}
