import { readFile } from "fs/promises";

import { doesPathExist } from "@khulnasoft/fs-utils";

import { RapiddocsOrganizationToken, RapiddocsToken, RapiddocsUserToken } from "../RapiddocsToken";
import { getPathToTokenFile } from "./getPathToTokenFile";

const RAPIDDOCS_TOKEN_ENV_VAR = "RAPIDDOCS_TOKEN";

export async function getToken(): Promise<RapiddocsToken | undefined> {
    return (await getAccessToken()) ?? (await getUserToken());
}

export async function getAccessToken(): Promise<RapiddocsOrganizationToken | undefined> {
    const tokenFromEnvVar = process.env[RAPIDDOCS_TOKEN_ENV_VAR];
    if (tokenFromEnvVar == null) {
        return undefined;
    }
    return {
        type: "organization",
        value: tokenFromEnvVar
    };
}

export async function getUserToken(): Promise<RapiddocsUserToken | undefined> {
    const pathToTokenFile = getPathToTokenFile();
    const doesTokenFileExist = await doesPathExist(pathToTokenFile);
    if (!doesTokenFileExist) {
        return undefined;
    }

    const tokenFileContents = await readFile(pathToTokenFile);
    const tokenString = tokenFileContents.toString().trim();
    if (tokenString.length === 0) {
        return undefined;
    }

    return {
        type: "user",
        value: tokenString
    };
}
