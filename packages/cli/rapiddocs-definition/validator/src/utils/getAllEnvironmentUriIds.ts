import { RapiddocsWorkspace } from "@khulnasoft/api-workspace-commons";
import { isRawMultipleBaseUrlsEnvironment } from "@khulnasoft/rapiddocs-definition-schema";

export function getAllEnvironmentUrlIds(workspace: RapiddocsWorkspace): string[] {
    if (workspace.definition.rootApiFile.contents.environments == null) {
        return [];
    }

    return Object.values(workspace.definition.rootApiFile.contents.environments).reduce<string[]>(
        (set, environment) => {
            if (isRawMultipleBaseUrlsEnvironment(environment)) {
                for (const urlId of Object.keys(environment.urls)) {
                    if (!set.includes(urlId)) {
                        set.push(urlId);
                    }
                }
            }
            return set;
        },
        []
    );
}
