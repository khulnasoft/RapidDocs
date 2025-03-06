export { RapiddocsDocsConfig as MigratedDocs } from "@rapiddocs-rapiddocs/docs-config";
export { type DocsInstances as DocsURL } from "@rapiddocs-rapiddocs/docs-config/api";
export { RapiddocsDocsConfig as LegacyDocs } from "@rapiddocs-rapiddocs/legacy-docs-config";
export * as LegacyDocsSerializers from "@rapiddocs-rapiddocs/legacy-docs-config/serialization";
export {
    getAbsolutePathToDocsFolder,
    getAbsolutePathToDocsYaml,
    loadRawDocsConfiguration
} from "./loadRawDocsConfiguration";
