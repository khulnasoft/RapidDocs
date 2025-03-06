import { IrVersions } from "../../ir-versions";
import { convertRapiddocsFilepathV1, convertRapiddocsFilepathV2 } from "./convertRapiddocsFilepath";
import { convertNameToV1, convertNameToV2 } from "./convertName";

export function convertDeclaredTypeName(
    typeName: IrVersions.V5.types.DeclaredTypeName
): IrVersions.V4.types.DeclaredTypeName {
    return {
        rapiddocsFilepath: convertRapiddocsFilepathV1(typeName.rapiddocsFilepath),
        rapiddocsFilepathV2: convertRapiddocsFilepathV2(typeName.rapiddocsFilepath),
        name: typeName.name.originalName,
        nameV2: convertNameToV1(typeName.name),
        nameV3: convertNameToV2(typeName.name)
    };
}
