import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";

import { ValidationViolation } from "../../../ValidationViolation";
import { getViolationsForRule } from "../../../testing-utils/getViolationsForRule";
import { NoExtensionsWithFileUploadRule } from "../no-extensions-with-file-upload";

describe("no-extensions-with-file-upload", () => {
    it("simple", async () => {
        const violations = await getViolationsForRule({
            rule: NoExtensionsWithFileUploadRule,
            absolutePathToWorkspace: join(
                AbsoluteFilePath.of(__dirname),
                RelativeFilePath.of("fixtures"),
                RelativeFilePath.of("simple")
            )
        });

        const expectedViolations: ValidationViolation[] = [
            {
                message: "Request body extensions are not supported for file-upload requests.",
                nodePath: ["service", "endpoints", "extendsAndFile"],
                relativeFilepath: RelativeFilePath.of("file-upload.yml"),
                severity: "fatal"
            }
        ];

        expect(violations).toEqual(expectedViolations);
    });
});
