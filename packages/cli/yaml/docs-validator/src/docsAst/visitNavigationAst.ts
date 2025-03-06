import { readFile } from "fs/promises";

import { docsYml } from "@khulnasoft/configuration-loader";
import { noop, visitObjectAsync } from "@khulnasoft/core-utils";
import { parseImagePaths } from "@khulnasoft/docs-markdown-utils";
import { NodePath } from "@khulnasoft/rapiddocs-definition-schema";
import { AbsoluteFilePath, dirname, doesPathExist, relative, resolve } from "@khulnasoft/fs-utils";
import { TaskContext } from "@khulnasoft/task-context";
import { RapiddocsWorkspace } from "@khulnasoft/workspace-loader";

import { DocsConfigFileAstVisitor } from "./DocsConfigFileAstVisitor";
import { visitFilepath } from "./visitFilepath";

export declare namespace visitNavigationAst {
    interface Args {
        absolutePathToRapiddocsFolder: AbsoluteFilePath;
        navigation: docsYml.RawSchemas.NavigationConfig;
        visitor: Partial<DocsConfigFileAstVisitor>;
        nodePath: NodePath;
        absoluteFilepathToConfiguration: AbsoluteFilePath;
        rapiddocsWorkspaces: RapiddocsWorkspace[];
        context: TaskContext;
    }
}

export async function visitNavigationAst({
    absolutePathToRapiddocsFolder,
    navigation,
    rapiddocsWorkspaces,
    visitor,
    absoluteFilepathToConfiguration,
    context,
    nodePath
}: visitNavigationAst.Args): Promise<void> {
    if (navigationConfigIsTabbed(navigation)) {
        await Promise.all(
            navigation.map(async (tab, tabIdx) => {
                if (tab.layout != null) {
                    await Promise.all(
                        tab.layout.map(async (item, itemIdx) => {
                            await visitNavigationItem({
                                absolutePathToRapiddocsFolder,
                                navigationItem: item,
                                visitor,
                                nodePath: [...nodePath, `${tabIdx}`, "layout", `${itemIdx}`],
                                absoluteFilepathToConfiguration,
                                rapiddocsWorkspaces,
                                context
                            });
                        })
                    );
                }
            })
        );
    } else {
        await Promise.all(
            navigation.map(async (item, itemIdx) => {
                await visitNavigationItem({
                    absolutePathToRapiddocsFolder,
                    navigationItem: item,
                    visitor,
                    nodePath: [...nodePath, `${itemIdx}`],
                    absoluteFilepathToConfiguration,
                    rapiddocsWorkspaces,
                    context
                });
            })
        );
    }
}
async function visitNavigationItem({
    absolutePathToRapiddocsFolder,
    navigationItem,
    visitor,
    nodePath,
    absoluteFilepathToConfiguration,
    rapiddocsWorkspaces,
    context
}: {
    absolutePathToRapiddocsFolder: AbsoluteFilePath;
    navigationItem: docsYml.RawSchemas.NavigationItem;
    visitor: Partial<DocsConfigFileAstVisitor>;
    nodePath: NodePath;
    absoluteFilepathToConfiguration: AbsoluteFilePath;
    rapiddocsWorkspaces: RapiddocsWorkspace[];
    context: TaskContext;
}): Promise<void> {
    await visitObjectAsync(navigationItem, {
        alphabetized: noop,
        api: noop,
        apiName: noop,
        audiences: noop,
        openrpc: async (path: string | undefined): Promise<void> => {
            if (path == null) {
                return;
            }

            await visitFilepath({
                absoluteFilepathToConfiguration,
                rawUnresolvedFilepath: path,
                visitor,
                nodePath: [...nodePath, "openrpc"],
                willBeUploaded: false
            });
        },
        displayErrors: noop,
        snippets: noop,
        summary: noop,
        title: noop,
        layout: noop,
        icon: noop,
        slug: noop,
        hidden: noop,
        skipSlug: noop,
        paginated: noop,
        playground: noop,
        flattened: noop,
        featureFlag: noop,
        path: async (path: string | undefined): Promise<void> => {
            if (path == null) {
                return;
            }

            await visitFilepath({
                absoluteFilepathToConfiguration,
                rawUnresolvedFilepath: path,
                visitor,
                nodePath: [...nodePath, "path"],
                willBeUploaded: false
            });
        },
        page: noop,
        contents: async (items: docsYml.RawSchemas.NavigationItem[] | undefined): Promise<void> => {
            if (items == null) {
                return;
            }
            await Promise.all(
                items.map(async (item, idx) => {
                    await visitNavigationItem({
                        absolutePathToRapiddocsFolder,
                        navigationItem: item,
                        visitor,
                        nodePath: [...nodePath, "contents", `${idx}`],
                        absoluteFilepathToConfiguration,
                        rapiddocsWorkspaces,
                        context
                    });
                })
            );
        },
        viewers: async (viewers: docsYml.RawSchemas.WithPermissions["viewers"]): Promise<void> => {
            if (viewers != null && viewers.length > 0) {
                await visitor.permissions?.({ viewers }, [...nodePath, "viewers"]);
            }
        },
        orphaned: noop
    });

    if (navigationItemIsPage(navigationItem)) {
        const absoluteFilepath = resolve(dirname(absoluteFilepathToConfiguration), navigationItem.path);
        if (await doesPathExist(absoluteFilepath)) {
            const content = (await readFile(absoluteFilepath)).toString();
            await visitor.markdownPage?.(
                {
                    title: navigationItem.page,
                    content,
                    absoluteFilepath
                },
                [...nodePath, navigationItem.path]
            );

            try {
                const { filepaths } = parseImagePaths(content, {
                    absolutePathToRapiddocsFolder,
                    absolutePathToMarkdownFile: absoluteFilepath
                });

                // visit each media filepath in each markdown file
                for (const filepath of filepaths) {
                    await visitor.filepath?.(
                        {
                            absoluteFilepath: filepath,
                            value: relative(absolutePathToRapiddocsFolder, filepath),
                            willBeUploaded: true
                        },
                        [...nodePath, navigationItem.path]
                    );
                }
            } catch (err) {}
        }
    }

    if (navigationItemIsApi(navigationItem)) {
        const workspace = rapiddocsWorkspaces.find((workspace) => workspace.workspaceName === navigationItem.apiName);
        if (workspace != null) {
            await visitor.apiSection?.(
                {
                    config: navigationItem,
                    workspace,
                    context
                },
                [...nodePath, "api"]
            );
        }
    }
}

function navigationItemIsPage(item: docsYml.RawSchemas.NavigationItem): item is docsYml.RawSchemas.PageConfiguration {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return (item as docsYml.RawSchemas.PageConfiguration).page != null;
}

function navigationItemIsApi(
    item: docsYml.RawSchemas.NavigationItem
): item is docsYml.RawSchemas.ApiReferenceConfiguration {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return (item as docsYml.RawSchemas.ApiReferenceConfiguration).api != null;
}

function navigationConfigIsTabbed(
    config: docsYml.RawSchemas.NavigationConfig
): config is docsYml.RawSchemas.TabbedNavigationConfig {
    return (config as docsYml.RawSchemas.TabbedNavigationConfig)[0]?.tab != null;
}
