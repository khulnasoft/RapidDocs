import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";
import { Type } from "@khulnasoft/ir-sdk";

import { RapiddocsFileContext } from "../../RapiddocsFileContext";

export function convertUndiscriminatedUnionTypeDeclaration({
    union,
    file
}: {
    union: RawSchemas.UndiscriminatedUnionSchema;
    file: RapiddocsFileContext;
}): Type {
    // Filter out duplicate members from the union by comparing their types
    const uniqueMembers = union.union.filter((currentMember, currentIndex) => {
        // Get the type, handling both string and object member formats
        const currentMemberTypeReference = typeof currentMember === "string" ? currentMember : currentMember.type;

        // Keep this member only if it's the first occurrence of its type
        return (
            union.union.findIndex((otherMember) => {
                const otherMemberType = typeof otherMember === "string" ? otherMember : otherMember.type;
                return otherMemberType === currentMemberTypeReference;
            }) === currentIndex
        );
    });

    return Type.undiscriminatedUnion({
        members: uniqueMembers.map((member) => {
            if (typeof member === "string") {
                return {
                    docs: undefined,
                    type: file.parseTypeReference(member)
                };
            }
            return {
                type: file.parseTypeReference(member.type),
                docs: member.docs
            };
        })
    });
}
