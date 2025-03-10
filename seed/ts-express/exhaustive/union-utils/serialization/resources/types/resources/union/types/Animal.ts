/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as SeedExhaustive from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const Animal: core.serialization.Schema<serializers.types.Animal.Raw, SeedExhaustive.types.Animal> =
    core.serialization
        .union("animal", {
            dog: core.serialization.lazyObject(() => serializers.types.Dog),
            cat: core.serialization.lazyObject(() => serializers.types.Cat),
        })
        .transform<SeedExhaustive.types.Animal>({
            transform: (value) => {
                switch (value.animal) {
                    case "dog":
                        return SeedExhaustive.types.Animal.dog(value);
                    case "cat":
                        return SeedExhaustive.types.Animal.cat(value);
                    default:
                        return SeedExhaustive.types.Animal._unknown(value);
                }
            },
            untransform: ({ _visit, ...value }) => value as any,
        });

export declare namespace Animal {
    export type Raw = Animal.Dog | Animal.Cat;

    export interface Dog extends serializers.types.Dog.Raw {
        animal: "dog";
    }

    export interface Cat extends serializers.types.Cat.Raw {
        animal: "cat";
    }
}
