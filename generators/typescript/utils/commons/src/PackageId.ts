import { SubpackageId } from "@rapiddocs-rapiddocs/ir-sdk/api";

export type PackageId = { isRoot: true } | { isRoot: false; subpackageId: SubpackageId };
