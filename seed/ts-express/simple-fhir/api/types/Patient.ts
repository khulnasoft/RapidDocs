/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as SeedApi from "../index";

export interface Patient extends SeedApi.BaseResource {
    resourceType: "Patient";
    name: string;
    scripts: SeedApi.Script[];
}
