import { readFile } from "fs/promises";
import path from "path";

import { AbsoluteFilePath } from "@khulnasoft/fs-utils";

import { runRapiddocsCli } from "../../utils/runRapiddocsCli";

const FIXTURES_DIR = path.join(__dirname, "fixtures");

describe("overrides", () => {
    itFixture("petstore");
});

function itFixture(fixtureName: string) {
    it(
        // eslint-disable-next-line jest/valid-title
        fixtureName,
        async () => {
            const fixturePath = path.join(FIXTURES_DIR, fixtureName);
            const outputPath = path.join(fixturePath, "rapiddocs", "openapi", "openapi-overrides.yml");

            await runRapiddocsCli(["write-overrides"], {
                cwd: fixturePath
            });

            await sleep(5000);

            expect((await readFile(AbsoluteFilePath.of(outputPath))).toString()).toMatchSnapshot();
        },
        90_000
    );
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
