/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsIr from "../../../../api/index";
import * as core from "../../../../core";
import { BearerAuthScheme } from "./BearerAuthScheme";
import { BasicAuthScheme } from "./BasicAuthScheme";
import { HeaderAuthScheme } from "./HeaderAuthScheme";
import { OAuthScheme } from "./OAuthScheme";

export const AuthScheme: core.serialization.Schema<serializers.AuthScheme.Raw, RapiddocsIr.AuthScheme> = core.serialization
    .union(core.serialization.discriminant("type", "_type"), {
        bearer: BearerAuthScheme,
        basic: BasicAuthScheme,
        header: HeaderAuthScheme,
        oauth: OAuthScheme,
    })
    .transform<RapiddocsIr.AuthScheme>({
        transform: (value) => {
            switch (value.type) {
                case "bearer":
                    return RapiddocsIr.AuthScheme.bearer(value);
                case "basic":
                    return RapiddocsIr.AuthScheme.basic(value);
                case "header":
                    return RapiddocsIr.AuthScheme.header(value);
                case "oauth":
                    return RapiddocsIr.AuthScheme.oauth(value);
                default:
                    return value as RapiddocsIr.AuthScheme;
            }
        },
        untransform: ({ _visit, ...value }) => value as any,
    });

export declare namespace AuthScheme {
    export type Raw = AuthScheme.Bearer | AuthScheme.Basic | AuthScheme.Header | AuthScheme.Oauth;

    export interface Bearer extends BearerAuthScheme.Raw {
        _type: "bearer";
    }

    export interface Basic extends BasicAuthScheme.Raw {
        _type: "basic";
    }

    export interface Header extends HeaderAuthScheme.Raw {
        _type: "header";
    }

    export interface Oauth extends OAuthScheme.Raw {
        _type: "oauth";
    }
}
