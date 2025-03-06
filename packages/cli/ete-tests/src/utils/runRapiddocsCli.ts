import { Options } from "execa";
import path from "path";

import { loggingExeca } from "@khulnasoft/logging-execa";

export async function runRapiddocsCli(args: string[], options?: Options): Promise<loggingExeca.ReturnValue> {
    return loggingExeca(undefined, "node", [path.join(__dirname, "../../../cli/dist/dev/cli.cjs"), ...args], {
        ...options,
        env: {
            ...options?.env,
            RAPIDDOCS_TOKEN: process.env.RAPIDDOCS_ORG_TOKEN_DEV
        },
        doNotPipeOutput: options?.reject === false
    });
}
