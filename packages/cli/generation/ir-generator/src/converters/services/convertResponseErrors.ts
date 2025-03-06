import { RawSchemas } from "@khulnasoft/rapiddocs-definition-schema";
import { ResponseErrors } from "@khulnasoft/ir-sdk";

import { RapiddocsFileContext } from "../../RapiddocsFileContext";
import { parseErrorName } from "../../utils/parseErrorName";

export function convertResponseErrors({
    errors,
    file
}: {
    errors: RawSchemas.ResponseErrorsSchema | undefined;
    file: RapiddocsFileContext;
}): ResponseErrors {
    return errors == null
        ? []
        : Object.values(errors).map((errorReference) => {
              const referenceToError = typeof errorReference === "string" ? errorReference : errorReference.error;
              const errorName = parseErrorName({
                  errorName: referenceToError,
                  file
              });
              return {
                  docs: typeof errorReference !== "string" ? errorReference.docs : undefined,
                  error: errorName
              };
          });
}
