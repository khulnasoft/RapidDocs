import { Options } from "execa";
import { cp, mkdir } from "fs/promises";
import stripAnsi from "strip-ansi";
import tmp from "tmp-promise";

import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";

import { runRapiddocsCli } from "../../utils/runRapiddocsCli";
import { init } from "../init/init";

const envWithCI = {
    CI: "true"
};

describe("output directory prompts", () => {
    it("doesn't show prompts for CI environment", async () => {
        const pathOfDirectory = await init();

        const { stdout } = await runRapiddocsCli(["generate", "--local", "--keepDocker"], {
            cwd: pathOfDirectory,
            env: envWithCI
        });

        const cleanOutput = stripAnsi(stdout).trim();
        expect(cleanOutput).not.toContain("contains existing files");
        expect(cleanOutput).not.toContain("Would you like to save this");
    }, 180_000);
});
