import { isNonNullish } from "@khulnasoft/core-utils";
import { OSSWorkspace } from "@khulnasoft/lazy-rapiddocs-workspace";
import { Project } from "@khulnasoft/project-loader";

export async function filterOssWorkspaces(project: Project): Promise<OSSWorkspace[]> {
    return (
        await Promise.all(
            project.apiWorkspaces.map(async (workspace) => {
                if (workspace instanceof OSSWorkspace) {
                    return workspace as OSSWorkspace;
                }
                return null;
            })
        )
    ).filter(isNonNullish);
}
