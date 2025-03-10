/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedTrace from "../../../../api/index";
import * as core from "../../../../core";
import { TestCaseHiddenGrade } from "./TestCaseHiddenGrade";
import { TestCaseNonHiddenGrade } from "./TestCaseNonHiddenGrade";

export const TestCaseGrade: core.serialization.Schema<serializers.TestCaseGrade.Raw, SeedTrace.TestCaseGrade> =
    core.serialization
        .union("type", {
            hidden: TestCaseHiddenGrade,
            nonHidden: TestCaseNonHiddenGrade,
        })
        .transform<SeedTrace.TestCaseGrade>({
            transform: (value) => {
                switch (value.type) {
                    case "hidden":
                        return SeedTrace.TestCaseGrade.hidden(value);
                    case "nonHidden":
                        return SeedTrace.TestCaseGrade.nonHidden(value);
                    default:
                        return SeedTrace.TestCaseGrade._unknown(value);
                }
            },
            untransform: ({ _visit, ...value }) => value as any,
        });

export declare namespace TestCaseGrade {
    export type Raw = TestCaseGrade.Hidden | TestCaseGrade.NonHidden;

    export interface Hidden extends TestCaseHiddenGrade.Raw {
        type: "hidden";
    }

    export interface NonHidden extends TestCaseNonHiddenGrade.Raw {
        type: "nonHidden";
    }
}
