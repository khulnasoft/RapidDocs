import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";
import { RelativeFilePath } from "@khulnasoft/path-utils";

import { RapiddocsDefinitionDirectory } from "../utils/RapiddocsDefinitionDirectory";

interface TestCase {
    description: string;
    giveFilepaths: string[];
    wantFiles: Record<string, RawSchemas.DefinitionFileSchema>;
}

describe("RapiddocsDefinitionDirectory", () => {
    const testCases: TestCase[] = [
        {
            description: "empty",
            giveFilepaths: [],
            wantFiles: {}
        },
        {
            description: "single file",
            giveFilepaths: ["example.yml"],
            wantFiles: {
                "example.yml": {}
            }
        },
        {
            description: "single directory",
            giveFilepaths: ["one/a.yml"],
            wantFiles: {
                "one/a.yml": {}
            }
        },
        {
            description: "single directory, multiple files",
            giveFilepaths: ["one/b.yml", "one/a.yml"],
            wantFiles: {
                "one/a.yml": {},
                "one/b.yml": {}
            }
        },
        {
            description: "multiple directory, multiple files",
            giveFilepaths: ["one/b.yml", "two/foo/d.yml", "two/foo/c.yml", "one/a.yml"],
            wantFiles: {
                "one/a.yml": {},
                "one/b.yml": {},
                "two/foo/c.yml": {},
                "two/foo/d.yml": {}
            }
        },
        {
            description: "file/directory match",
            giveFilepaths: ["user/events/metadata.yml", "user/events.yml", "user.yml", "events.yml"],
            wantFiles: {
                "events.yml": {},
                "user.yml": {},
                "user/events.yml": {},
                "user/events/metadata.yml": {}
            }
        }
    ];

    testCases.forEach((testCase) => {
        it(`"${testCase.description}"`, async () => {
            const root = new RapiddocsDefinitionDirectory();
            for (const filepath of testCase.giveFilepaths) {
                root.getOrCreateFile(RelativeFilePath.of(filepath));
            }
            expect(root.getAllFiles()).toEqual(testCase.wantFiles);
        });
    });
});
