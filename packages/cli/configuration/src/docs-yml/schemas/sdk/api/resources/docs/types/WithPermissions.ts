/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as RapiddocsDocsConfig from "../../../index";

export interface WithPermissions {
    viewers?: RapiddocsDocsConfig.Role;
    /** When `orphaned` is set to `true`, the roles will not inherit from parents. */
    orphaned?: boolean;
}
