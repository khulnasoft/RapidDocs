/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as RapiddocsIr from "../../../../../index";

export interface GeneratorConfig {
    dryRun: boolean;
    irFilepath: string;
    originalReadmeFilepath: string | undefined;
    license: RapiddocsIr.generatorExec.LicenseConfig | undefined;
    output: RapiddocsIr.generatorExec.GeneratorOutputConfig;
    /** Deprecated. Use output.mode instead. */
    publish: RapiddocsIr.generatorExec.GeneratorPublishConfig | undefined;
    workspaceName: string;
    organization: string;
    customConfig: unknown;
    environment: RapiddocsIr.generatorExec.GeneratorEnvironment;
    whitelabel: boolean;
    writeUnitTests: boolean;
    generatePaginatedClients: boolean | undefined;
    generateOauthClients: boolean;
}
