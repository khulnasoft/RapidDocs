import { NodePath } from "@khulnasoft/rapiddocs-definition-schema";
import { RelativeFilePath } from "@khulnasoft/fs-utils";

export interface ValidationViolation {
    name?: string;
    severity: "fatal" | "error" | "warning";
    relativeFilepath: RelativeFilePath;
    nodePath: NodePath;
    message: string;
}
