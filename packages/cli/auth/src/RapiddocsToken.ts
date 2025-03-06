export type RapiddocsToken = RapiddocsOrganizationToken | RapiddocsUserToken;

export interface RapiddocsOrganizationToken {
    type: "organization";
    value: string;
}
export interface RapiddocsUserToken {
    type: "user";
    value: string;
}
