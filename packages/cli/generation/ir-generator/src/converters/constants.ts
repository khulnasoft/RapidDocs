import { CasingsGenerator } from "@khulnasoft/casings-generator";
import { Constants } from "@khulnasoft/ir-sdk";

export function generateRapiddocsConstants(casingsGenerator: CasingsGenerator): Constants {
    return {
        errorInstanceIdKey: casingsGenerator.generateNameAndWireValue({
            wireValue: "errorInstanceId",
            name: "errorInstanceId"
        })
    };
}
