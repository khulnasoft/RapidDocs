import {
    Availability,
    EnumValue,
    SchemaWithExample,
    SdkGroupName,
    Source,
    generateEnumNameFromValue
} from "@khulnasoft/openapi-ir";
import { VALID_ENUM_NAME_REGEX } from "@khulnasoft/openapi-ir";

import { RapiddocsEnumConfig } from "../openapi/v3/extensions/getRapiddocsEnum";
import { SchemaParserContext } from "./SchemaParserContext";

export function convertEnum({
    nameOverride,
    generatedName,
    title,
    rapiddocsEnum,
    enumVarNames,
    enumValues,
    _default,
    description,
    availability,
    wrapAsNullable,
    groupName,
    context,
    source,
    inline
}: {
    nameOverride: string | undefined;
    generatedName: string;
    title: string | undefined;
    rapiddocsEnum: RapiddocsEnumConfig | undefined;
    enumVarNames: string[] | undefined;
    enumValues: string[];
    _default: string | undefined;
    description: string | undefined;
    availability: Availability | undefined;
    wrapAsNullable: boolean;
    groupName: SdkGroupName | undefined;
    context: SchemaParserContext | undefined;
    source: Source;
    inline: boolean | undefined;
}): SchemaWithExample {
    const strippedEnumVarNames = stripCommonPrefix(enumVarNames ?? []);
    const uniqueValues = new Set(enumValues);
    const values = Array.from(uniqueValues).map((value, index): EnumValue => {
        const rapiddocsEnumValue = rapiddocsEnum?.[value];
        const enumVarName = strippedEnumVarNames[index];
        const valueIsValidName = VALID_ENUM_NAME_REGEX.test(value);
        let nameOverride = rapiddocsEnumValue?.name ?? enumVarName;
        const generatedName = valueIsValidName ? value : generateEnumNameFromValue(value);

        if (nameOverride != null && !VALID_ENUM_NAME_REGEX.test(nameOverride)) {
            context?.logger.warn(
                `Enum name override ${nameOverride} is not a valid name. Falling back on ${generatedName}.`
            );
            nameOverride = undefined;
        }

        return {
            nameOverride,
            generatedName,
            value,
            description: rapiddocsEnumValue?.description,
            availability,
            casing: {
                snake: rapiddocsEnumValue?.casing?.snake ?? undefined,
                pascal: rapiddocsEnumValue?.casing?.pascal ?? undefined,
                screamingSnake: rapiddocsEnumValue?.casing?.screamingSnake ?? undefined,
                camel: rapiddocsEnumValue?.casing?.camel ?? undefined
            }
        };
    });
    const _defaultEnumValue = _default != null ? values.find((value) => value.value === _default) : undefined;
    return wrapEnum({
        wrapAsNullable,
        nameOverride,
        generatedName,
        title,
        values,
        _default: _defaultEnumValue,
        description,
        availability,
        groupName,
        source,
        inline
    });
}

export function wrapEnum({
    wrapAsNullable,
    nameOverride,
    generatedName,
    title,
    values,
    _default,
    description,
    availability,
    groupName,
    source,
    inline
}: {
    wrapAsNullable: boolean;
    nameOverride: string | undefined;
    generatedName: string;
    title: string | undefined;
    values: EnumValue[];
    _default: EnumValue | undefined;
    description: string | undefined;
    availability: Availability | undefined;
    groupName: SdkGroupName | undefined;
    source: Source;
    inline: boolean | undefined;
}): SchemaWithExample {
    if (wrapAsNullable) {
        return SchemaWithExample.nullable({
            nameOverride,
            generatedName,
            title,
            value: SchemaWithExample.enum({
                nameOverride,
                generatedName,
                title,
                values,
                description,
                default: _default,
                availability,
                example: undefined,
                groupName,
                source,
                inline
            }),
            description,
            availability,
            groupName,
            inline
        });
    }
    return SchemaWithExample.enum({
        nameOverride,
        generatedName,
        title,
        values,
        description,
        availability,
        default: _default,
        example: undefined,
        groupName,
        source,
        inline
    });
}

function stripCommonPrefix(names: string[]): string[] {
    if (names.length <= 1 || names[0] == null) {
        return names;
    }

    const nameZero = names[0];

    let i = 0;
    // while all words have the same character at position i, increment i
    while (nameZero[i] != null && names.every((name) => name[i] === nameZero[i])) {
        i++;
    }

    // prefix is the substring from the beginning to the last successfully checked i
    return names.map((name) => name.substring(i));
}
