/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

package types;

import com.fasterxml.jackson.annotation.JsonValue;
import java.lang.String;

public enum ComplexType {
  OBJECT("object"),

  UNION("union"),

  UNKNOWN("unknown");

  private final String value;

  ComplexType(String value) {
    this.value = value;
  }

  @JsonValue
  @java.lang.Override
  public String toString() {
    return this.value;
  }
}
