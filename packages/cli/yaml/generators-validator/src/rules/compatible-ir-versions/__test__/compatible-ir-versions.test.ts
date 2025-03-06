import { AbsoluteFilePath, RelativeFilePath, join } from "@khulnasoft/fs-utils";

import { ValidationViolation } from "../../../ValidationViolation";
import { getViolationsForRule } from "../../../testing-utils/getViolationsForRule";
import { CompatibleIrVersionsRule } from "../compatible-ir-versions";

describe("compatible-ir-versions", () => {
    it("simple failure", async () => {
        process.env.DEFAULT_FDR_ORIGIN = "https://registry-dev2.buildwithrapiddocs.com";
        const violations = await getViolationsForRule({
            rule: CompatibleIrVersionsRule,
            absolutePathToWorkspace: join(
                AbsoluteFilePath.of(__dirname),
                RelativeFilePath.of("fixtures"),
                RelativeFilePath.of("simple")
            ),
            cliVersion: "0.1.3-rc0"
        });

        const expectedViolations: ValidationViolation[] = [
            {
                severity: "fatal",
                relativeFilepath: RelativeFilePath.of("generators.yml"),
                nodePath: ["groups", "python-sdk", "generators", "0", "rapiddocsapi/rapiddocs-python-sdk"],
                message:
                    "The generator rapiddocsapi/rapiddocs-python-sdk requires CLI version 0.23.0-rc4 or later (current version: 0.1.3-rc0). Please run `rapiddocs upgrade` to upgrade your CLI version and use this generator."
            }
        ];

        expect(violations).toEqual(expectedViolations);
    }, 10_000);

    it("simple success", async () => {
        process.env.DEFAULT_FDR_ORIGIN = "https://registry-dev2.buildwithrapiddocs.com";
        const violations = await getViolationsForRule({
            rule: CompatibleIrVersionsRule,
            absolutePathToWorkspace: join(
                AbsoluteFilePath.of(__dirname),
                RelativeFilePath.of("fixtures"),
                RelativeFilePath.of("simple")
            ),
            // Latest CLI at the time of writing, so should definitely work
            cliVersion: "0.41.10"
        });

        const expectedViolations: ValidationViolation[] = [];

        expect(violations).toEqual(expectedViolations);
    }, 10_000);
});
