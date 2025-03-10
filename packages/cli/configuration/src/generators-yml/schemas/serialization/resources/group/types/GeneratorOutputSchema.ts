/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../index";
import * as RapiddocsDefinition from "../../../../api/index";
import * as core from "../../../../core";
import { NpmOutputLocationSchema } from "./NpmOutputLocationSchema";
import { MavenOutputLocationSchema } from "./MavenOutputLocationSchema";
import { PypiOutputLocationSchema } from "./PypiOutputLocationSchema";
import { PostmanOutputLocationSchema } from "./PostmanOutputLocationSchema";
import { LocalFileSystemOutputLocationSchema } from "./LocalFileSystemOutputLocationSchema";
import { NugetOutputLocationSchema } from "./NugetOutputLocationSchema";
import { RubyGemsOutputLocationSchema } from "./RubyGemsOutputLocationSchema";

export const GeneratorOutputSchema: core.serialization.Schema<
    serializers.GeneratorOutputSchema.Raw,
    RapiddocsDefinition.GeneratorOutputSchema
> = core.serialization
    .union("location", {
        npm: NpmOutputLocationSchema,
        maven: MavenOutputLocationSchema,
        pypi: PypiOutputLocationSchema,
        postman: PostmanOutputLocationSchema,
        "local-file-system": LocalFileSystemOutputLocationSchema,
        nuget: NugetOutputLocationSchema,
        rubygems: RubyGemsOutputLocationSchema,
    })
    .transform<RapiddocsDefinition.GeneratorOutputSchema>({
        transform: (value) => value,
        untransform: (value) => value,
    });

export declare namespace GeneratorOutputSchema {
    export type Raw =
        | GeneratorOutputSchema.Npm
        | GeneratorOutputSchema.Maven
        | GeneratorOutputSchema.Pypi
        | GeneratorOutputSchema.Postman
        | GeneratorOutputSchema.LocalFileSystem
        | GeneratorOutputSchema.Nuget
        | GeneratorOutputSchema.Rubygems;

    export interface Npm extends NpmOutputLocationSchema.Raw {
        location: "npm";
    }

    export interface Maven extends MavenOutputLocationSchema.Raw {
        location: "maven";
    }

    export interface Pypi extends PypiOutputLocationSchema.Raw {
        location: "pypi";
    }

    export interface Postman extends PostmanOutputLocationSchema.Raw {
        location: "postman";
    }

    export interface LocalFileSystem extends LocalFileSystemOutputLocationSchema.Raw {
        location: "local-file-system";
    }

    export interface Nuget extends NugetOutputLocationSchema.Raw {
        location: "nuget";
    }

    export interface Rubygems extends RubyGemsOutputLocationSchema.Raw {
        location: "rubygems";
    }
}
