import { writeFile } from "fs/promises";

import { RAPIDDOCSIGNORE_FILENAME } from "@khulnasoft/configuration";
import { AbsoluteFilePath, RelativeFilePath, doesPathExist, join } from "@khulnasoft/fs-utils";

import { runRapiddocsCli } from "../../utils/runRapiddocsCli";
import { init } from "../init/init";

const RAPIDDOCSIGNORE_FILECONTENTS = `
rapiddocs.js
**/*.txt
`;

const RAPIDDOCS_JS_FILENAME = "rapiddocs.js";
const RAPIDDOCS_JS_FILECONTENTS = `
#!/usr/bin/env node
console.log('Water the plants')
`;

const DUMMY_TXT_FILENAME = "dummy.txt";
const DUMMY_TXT_FILECONTENTS = `
Practice schema-first API design with Rapiddocs
`;

describe("rapiddocs generate --local", () => {
    // eslint-disable-next-line jest/expect-expect
    it("Keep files listed in .rapiddocsignore from unmodified", async () => {
        const pathOfDirectory = await init();
        await runRapiddocsCli(["generate", "--local", "--keepDocker"], {
            cwd: pathOfDirectory
        });

        // write custom files and override
        const absolutePathToLocalOutput = join(pathOfDirectory, RelativeFilePath.of("sdks/typescript"));

        const absolutePathToRapiddocsignore = join(absolutePathToLocalOutput, RelativeFilePath.of(RAPIDDOCSIGNORE_FILENAME));
        await writeFile(absolutePathToRapiddocsignore, RAPIDDOCSIGNORE_FILECONTENTS);

        const absolutePathToRapiddocsJs = join(absolutePathToLocalOutput, RelativeFilePath.of(RAPIDDOCS_JS_FILENAME));
        await writeFile(absolutePathToRapiddocsJs, RAPIDDOCS_JS_FILECONTENTS);

        const absolutePathToDummyText = join(absolutePathToLocalOutput, RelativeFilePath.of(DUMMY_TXT_FILENAME));
        await writeFile(absolutePathToDummyText, DUMMY_TXT_FILECONTENTS);

        await runRapiddocsCli(["generate", "--local", "--keepDocker"], {
            cwd: pathOfDirectory
        });

        await expectPathExists(absolutePathToRapiddocsignore);
        await expectPathExists(absolutePathToRapiddocsJs);
        await expectPathDoesNotExist(absolutePathToDummyText);

        // rerun and make sure no issues if there are no changes
        await runRapiddocsCli(["generate", "--local", "--keepDocker"], {
            cwd: pathOfDirectory
        });
    }, 360_000);
});

async function expectPathDoesNotExist(absoluteFilePath: AbsoluteFilePath): Promise<void> {
    expect(await doesPathExist(absoluteFilePath)).toBe(false);
}

async function expectPathExists(absoluteFilePath: AbsoluteFilePath): Promise<void> {
    expect(await doesPathExist(absoluteFilePath)).toBe(true);
}
