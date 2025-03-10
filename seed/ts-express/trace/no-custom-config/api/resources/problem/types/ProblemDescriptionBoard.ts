/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as SeedTrace from "../../../index";

export type ProblemDescriptionBoard =
    | SeedTrace.ProblemDescriptionBoard.Html
    | SeedTrace.ProblemDescriptionBoard.Variable
    | SeedTrace.ProblemDescriptionBoard.TestCaseId;

export namespace ProblemDescriptionBoard {
    export interface Html {
        type: "html";
        value: string;
    }

    export interface Variable {
        type: "variable";
        value: SeedTrace.VariableValue;
    }

    export interface TestCaseId {
        type: "testCaseId";
        value: string;
    }
}
