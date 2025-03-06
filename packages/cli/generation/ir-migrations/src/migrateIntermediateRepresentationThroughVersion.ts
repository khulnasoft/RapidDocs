import { IntermediateRepresentation } from "@khulnasoft/ir-sdk";
import { TaskContext } from "@khulnasoft/task-context";

import { getIntermediateRepresentationMigrator } from "./IntermediateRepresentationMigrator";

export function migrateIntermediateRepresentationThroughVersion({
    intermediateRepresentation,
    context,
    version
}: {
    intermediateRepresentation: IntermediateRepresentation;
    context: TaskContext;
    version: string;
}): Promise<unknown> {
    const migrated = getIntermediateRepresentationMigrator().migrateThroughVersion({
        version,
        intermediateRepresentation,
        context
    });
    return migrated.jsonify();
}
