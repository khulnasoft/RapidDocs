/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

package com.rapiddocs.sdk.resources.types.object.errors;

import com.rapiddocs.sdk.core.SeedExhaustiveApiException;
import com.rapiddocs.sdk.resources.types.object.types.NestedObjectWithOptionalField;

public final class NestedObjectWithOptionalFieldError extends SeedExhaustiveApiException {
  /**
   * The body of the response that triggered the exception.
   */
  private final NestedObjectWithOptionalField body;

  public NestedObjectWithOptionalFieldError(NestedObjectWithOptionalField body) {
    super("NestedObjectWithOptionalFieldError", 400, body);
    this.body = body;
  }

  /**
   * @return the body
   */
  @java.lang.Override
  public NestedObjectWithOptionalField body() {
    return this.body;
  }
}
