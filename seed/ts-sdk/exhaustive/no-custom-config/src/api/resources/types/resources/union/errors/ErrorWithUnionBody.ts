/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as errors from "../../../../../../errors/index";
import * as SeedExhaustive from "../../../../../index";

export class ErrorWithUnionBody extends errors.SeedExhaustiveError {
    constructor(body: SeedExhaustive.types.Animal) {
        super({
            message: "ErrorWithUnionBody",
            statusCode: 400,
            body: body,
        });
        Object.setPrototypeOf(this, ErrorWithUnionBody.prototype);
    }
}
