import { DefinitionFileSchema } from "@khulnasoft/rapiddocs-definition-schema";
import { RelativeFilePath } from "@khulnasoft/path-utils";

import { RapiddocsWorkspace } from "../RapiddocsWorkspace";
import { getAllDefinitionFiles } from "./getAllDefinitionFiles";

export function getDefinitionFile(
    workspace: RapiddocsWorkspace,
    relativeFilepath: RelativeFilePath
): DefinitionFileSchema | undefined {
    return getAllDefinitionFiles(workspace.definition)[relativeFilepath]?.contents;
}
