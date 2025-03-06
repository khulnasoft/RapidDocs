import { TypeDeclaration } from "@khulnasoft/ir-sdk";
import { LoggableRapiddocsCliError } from "@khulnasoft/task-context";

export function getTypeDeclaration(typeId: string, types: Record<string, TypeDeclaration>): TypeDeclaration {
    const maybeTypeDeclaration = types[typeId];
    if (maybeTypeDeclaration == null) {
        throw new LoggableRapiddocsCliError(`Illegal Error: Failed to load type declaration for type ${typeId}`);
    }
    return maybeTypeDeclaration;
}
