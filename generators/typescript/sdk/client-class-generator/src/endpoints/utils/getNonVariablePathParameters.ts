import { PathParameter } from "@rapiddocs-rapiddocs/ir-sdk/api";

export function getNonVariablePathParameters(pathParameters: PathParameter[]): PathParameter[] {
    return pathParameters.filter((pathParameter) => pathParameter.variable == null);
}
