/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

import * as fs from "fs";
import * as SeedFileUpload from "../../../../index";

export interface WithFormEncodingRequest {
    file: File | fs.ReadStream | Blob;
    foo: string;
    bar: SeedFileUpload.MyObject;
}
