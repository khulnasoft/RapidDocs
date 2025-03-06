import { OpenAPISpec } from "@khulnasoft/api-workspace-commons";
import { OSSWorkspace } from "@khulnasoft/lazy-rapiddocs-workspace";
import { Logger } from "@khulnasoft/logger";
import { TaskContext } from "@khulnasoft/task-context";

import { ValidationViolation } from "./ValidationViolation";

export interface Rule {
    name: string;
    run: (context: RuleContext) => Promise<ValidationViolation[]>;
}

export interface RuleContext {
    workspace: OSSWorkspace;
    specs: OpenAPISpec[];
    context: TaskContext;
}
