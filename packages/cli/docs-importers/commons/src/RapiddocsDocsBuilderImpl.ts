import { cp, mkdir, writeFile } from "fs/promises";
import yaml from "js-yaml";

import {
    DOCS_CONFIGURATION_FILENAME,
    RAPIDDOCS_DIRECTORY,
    GENERATORS_CONFIGURATION_FILENAME,
    docsYml,
    generatorsYml
} from "@khulnasoft/configuration";
import { AbsoluteFilePath, RelativeFilePath, dirname, join } from "@khulnasoft/fs-utils";

import { RapiddocsRegistry as CjsFdrSdk } from "@rapiddocs-rapiddocs/fdr-cjs-sdk";

import { RapiddocsDocsBuilder, RapiddocsDocsNavigationBuilder } from "./RapiddocsDocsBuilder";

interface MarkdownPage {
    frontmatter: CjsFdrSdk.docs.latest.Frontmatter;
    markdown: string;
}

interface Asset {
    absoluteFilePathToAsset: AbsoluteFilePath;
}

export class RapiddocsDocsBuilderImpl extends RapiddocsDocsBuilder {
    private openApiSpecs: Record<RelativeFilePath, AbsoluteFilePath> = {};
    private nonTabbedNavigation: NonTabbedNavigationBuilderImpl = new NonTabbedNavigationBuilderImpl();
    private tabbedNavigation: Record<docsYml.RawSchemas.TabId, TabbedNavigationBuilderImpl> = {};
    private markdownPages: Record<RelativeFilePath, MarkdownPage> = {};
    private assets: Record<RelativeFilePath, Asset> = {};
    private docsYml: docsYml.RawSchemas.DocsConfiguration = {
        instances: []
    };
    private generatorsYml: generatorsYml.GeneratorsConfigurationSchema = {
        api: { specs: [] as generatorsYml.ApiConfigurationV2SpecsSchema }
    };

    public addOpenAPI({
        relativePathToOpenAPI,
        absolutePathToOpenAPI
    }: {
        relativePathToOpenAPI: RelativeFilePath;
        absolutePathToOpenAPI: AbsoluteFilePath;
    }): void {
        this.openApiSpecs[relativePathToOpenAPI] = absolutePathToOpenAPI;
    }

    public addMarkdownPage({
        frontmatter,
        markdown,
        relativeFilePathFromDocsYml
    }: {
        frontmatter: CjsFdrSdk.docs.latest.Frontmatter;
        markdown: string;
        relativeFilePathFromDocsYml: RelativeFilePath;
    }): void {
        this.markdownPages[relativeFilePathFromDocsYml] = { markdown, frontmatter };
    }

    public addAsset({
        absoluteFilePathToAsset,
        relativeFilePathFromDocsYml
    }: {
        absoluteFilePathToAsset: AbsoluteFilePath;
        relativeFilePathFromDocsYml: RelativeFilePath;
    }): void {
        this.assets[relativeFilePathFromDocsYml] = { absoluteFilePathToAsset };
    }

    public getNavigationBuilder(args?: {
        tabId: string;
        tabConfig: docsYml.RawSchemas.TabConfig;
    }): RapiddocsDocsNavigationBuilder {
        if (args != null) {
            let navigationBuilder = this.tabbedNavigation[args.tabId];
            if (navigationBuilder == null) {
                navigationBuilder = new TabbedNavigationBuilderImpl(args.tabId, args.tabConfig);
                this.tabbedNavigation[args.tabId] = navigationBuilder;
            }
            return navigationBuilder;
        }
        return this.nonTabbedNavigation;
    }

    public addVersion({
        versionConfig,
        navigation
    }: {
        versionConfig: docsYml.RawSchemas.VersionConfig;
        navigation: docsYml.RawSchemas.VersionFileConfig;
    }): void {
        throw new Error("Method not implemented.");
    }

    public addNavbarLink({ link }: { link: docsYml.RawSchemas.NavbarLink }): void {
        if (this.docsYml.navbarLinks == null) {
            this.docsYml.navbarLinks = [link];
        }
        this.docsYml.navbarLinks.push(link);
    }

    public setTitle({ title }: { title: string }): void {
        this.docsYml.title = title;
    }

    public setFavicon({ favicon }: { favicon: RelativeFilePath }): void {
        this.docsYml.favicon = favicon;
    }

    public setLogo({ logo }: { logo: docsYml.RawSchemas.LogoConfiguration }): void {
        this.docsYml.logo = logo;
    }

    public setColors({ colors }: { colors: docsYml.RawSchemas.ColorsConfiguration }): void {
        this.docsYml.colors = colors;
    }

    public setLayout({ layout }: { layout: docsYml.RawSchemas.LayoutConfig }): void {
        this.docsYml.layout = layout;
    }

    public async build({ outputDirectory }: { outputDirectory: AbsoluteFilePath }): Promise<void> {
        const absolutePathToRapiddocsDirectory = join(outputDirectory, RelativeFilePath.of(RAPIDDOCS_DIRECTORY));
        await mkdir(absolutePathToRapiddocsDirectory, { recursive: true });

        if (Object.keys(this.tabbedNavigation).length > 0) {
            this.docsYml.tabs = Object.fromEntries(
                Object.entries(this.tabbedNavigation).map(([key, value]) => {
                    return [value.tabId, value.tabConfig];
                })
            );
            const tabbedNavigationItems: docsYml.RawSchemas.TabbedNavigationItem[] = [];
            Object.entries(this.tabbedNavigation).forEach(([_, value]) => {
                const tabbedItem: docsYml.RawSchemas.TabbedNavigationItem = {
                    tab: value.tabId,
                    ...(value.items.length > 0 ? { layout: value.items } : {})
                };
                tabbedNavigationItems.push(tabbedItem);
            });
            this.docsYml.navigation = tabbedNavigationItems;
        } else if (this.nonTabbedNavigation != null) {
            this.docsYml.navigation = this.nonTabbedNavigation.items;
        }
        if (Object.entries(this.openApiSpecs).length > 0 && this.generatorsYml?.api != null) {
            if (typeof this.generatorsYml.api !== "string") {
                this.generatorsYml.api = {
                    specs: Object.entries(this.openApiSpecs).map(([relativePath]) => ({
                        openapi: relativePath
                    }))
                };
            }
            await writeFile(
                join(absolutePathToRapiddocsDirectory, RelativeFilePath.of(GENERATORS_CONFIGURATION_FILENAME)),
                yaml.dump(generatorsYml.serialization.GeneratorsConfigurationSchema.jsonOrThrow(this.generatorsYml))
            );
            await Promise.all(
                Object.entries(this.openApiSpecs).map(async ([relativePath, absolutePath]) => {
                    const absolutePathToOpenAPI = join(absolutePathToRapiddocsDirectory, RelativeFilePath.of(relativePath));
                    await mkdir(dirname(absolutePathToOpenAPI), { recursive: true });
                    await cp(absolutePath, absolutePathToOpenAPI);
                })
            );
        }

        await writeFile(
            join(absolutePathToRapiddocsDirectory, RelativeFilePath.of(DOCS_CONFIGURATION_FILENAME)),
            yaml.dump(docsYml.RawSchemas.Serializer.DocsConfiguration.jsonOrThrow(this.docsYml))
        );

        await Promise.all(
            Object.entries(this.markdownPages).map(async ([filepath, page]) => {
                const absoluteFilepathToMarkdownPage = join(absolutePathToRapiddocsDirectory, RelativeFilePath.of(filepath));
                await mkdir(dirname(absoluteFilepathToMarkdownPage), { recursive: true });
                const frontmatter =
                    Object.keys(page.frontmatter).length > 0
                        ? `---\n${yaml.dump(JSON.parse(JSON.stringify(page.frontmatter)))}---\n\n`
                        : "";
                await writeFile(absoluteFilepathToMarkdownPage, `${frontmatter}${page.markdown}`);
            })
        );

        await Promise.all(
            Object.entries(this.assets).map(async ([filepath, asset]) => {
                const absolutePathToAsset = join(absolutePathToRapiddocsDirectory, RelativeFilePath.of(filepath));
                await mkdir(dirname(absolutePathToAsset), { recursive: true });
                await cp(asset.absoluteFilePathToAsset, absolutePathToAsset);
            })
        );
    }

    public setInstance({ companyName }: { companyName: string }): string {
        // We may append a suffix to the company name string to make it harder for
        // other companies to build migrators for our docs. For now, we're not doing
        // so but we can add that easily in the future.
        const formattedCompanyString = companyName.toLowerCase().replace(" ", "-");

        const rapiddocsDocsUrl = `https://${formattedCompanyString}.docs.buildwithrapiddocs.com`;

        this.docsYml.instances.push({
            url: rapiddocsDocsUrl
        });

        return rapiddocsDocsUrl;
    }
}

export class TabbedNavigationBuilderImpl implements RapiddocsDocsNavigationBuilder {
    public items: docsYml.RawSchemas.NavigationItem[] = [];

    public constructor(
        public readonly tabId: docsYml.RawSchemas.TabId,
        public readonly tabConfig: docsYml.RawSchemas.TabConfig
    ) {}

    public addItem({ item }: { item: docsYml.RawSchemas.NavigationItem }): void {
        this.items.push(item);
    }
}

export class NonTabbedNavigationBuilderImpl implements RapiddocsDocsNavigationBuilder {
    public items: docsYml.RawSchemas.NavigationItem[] = [];

    public addItem({ item }: { item: docsYml.RawSchemas.NavigationItem }): void {
        this.items.push(item);
    }
}
