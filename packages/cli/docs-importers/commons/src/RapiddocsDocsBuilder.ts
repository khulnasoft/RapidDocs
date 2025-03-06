import { docsYml } from "@khulnasoft/configuration";
import { AbsoluteFilePath, RelativeFilePath } from "@khulnasoft/fs-utils";

import { RapiddocsRegistry as CjsFdrSdk } from "@rapiddocs-rapiddocs/fdr-cjs-sdk";

/**
 * A builder utility to help
 */
export abstract class RapiddocsDocsBuilder {
    public abstract addOpenAPI({
        relativePathToOpenAPI,
        absolutePathToOpenAPI
    }: {
        relativePathToOpenAPI: RelativeFilePath;
        absolutePathToOpenAPI: AbsoluteFilePath;
    }): void;

    public abstract addMarkdownPage({
        frontmatter,
        markdown,
        relativeFilePathFromDocsYml
    }: {
        frontmatter: CjsFdrSdk.docs.latest.Frontmatter;
        markdown: string;
        relativeFilePathFromDocsYml: RelativeFilePath;
    }): void;

    public abstract addAsset({
        absoluteFilePathToAsset,
        relativeFilePathFromDocsYml
    }: {
        absoluteFilePathToAsset: AbsoluteFilePath;
        relativeFilePathFromDocsYml: RelativeFilePath;
    }): void;

    public abstract addVersion({
        versionConfig,
        navigation
    }: {
        versionConfig: docsYml.RawSchemas.VersionConfig;
        navigation: docsYml.RawSchemas.VersionFileConfig;
    }): void;

    public abstract getNavigationBuilder({
        tabId,
        tabConfig
    }?: {
        tabId: docsYml.RawSchemas.TabId;
        tabConfig: docsYml.RawSchemas.TabConfig;
    }): RapiddocsDocsNavigationBuilder;

    public abstract addNavbarLink({ link }: { link: docsYml.RawSchemas.NavbarLink }): void;

    public abstract setTitle({ title }: { title: string }): void;

    public abstract setFavicon({ favicon }: { favicon: RelativeFilePath }): void;

    public abstract setLogo({ logo }: { logo: docsYml.RawSchemas.LogoConfiguration }): void;

    public abstract setColors({ colors }: { colors: docsYml.RawSchemas.ColorsConfiguration }): void;

    public abstract setLayout({ layout }: { layout: docsYml.RawSchemas.LayoutConfig }): void;

    public abstract build({ outputDirectory }: { outputDirectory: AbsoluteFilePath }): void;

    public abstract setInstance({ companyName }: { companyName: string }): string;
}

export abstract class RapiddocsDocsNavigationBuilder {
    public abstract addItem({ item }: { item: docsYml.RawSchemas.NavigationItem }): void;
}
