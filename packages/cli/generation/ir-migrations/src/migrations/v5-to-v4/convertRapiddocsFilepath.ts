import { IrVersions } from "../../ir-versions";
import { convertNameToV1, convertNameToV2 } from "./convertName";

export function convertRapiddocsFilepathV1(
    rapiddocsFilepath: IrVersions.V5.commons.RapiddocsFilepath
): IrVersions.V4.commons.RapiddocsFilepath {
    return rapiddocsFilepath.map((part) => convertNameToV1(part));
}

export function convertRapiddocsFilepathV2(
    rapiddocsFilepath: IrVersions.V5.commons.RapiddocsFilepath
): IrVersions.V4.commons.RapiddocsFilepathV2 {
    return rapiddocsFilepath.map((part) => convertNameToV2(part));
}
