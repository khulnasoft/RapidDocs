/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

package resources.v2.problem.types;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import java.lang.Object;
import java.lang.String;

public final class TestCaseTemplateId {
  private final String value;

  private TestCaseTemplateId(String value) {
    this.value = value;
  }

  @JsonValue
  public String get() {
    return this.value;
  }

  @java.lang.Override
  public boolean equals(Object other) {
    return this == other || (other instanceof TestCaseTemplateId && this.value.equals(((TestCaseTemplateId) other).value));
  }

  @java.lang.Override
  public int hashCode() {
    return value.hashCode();
  }

  @java.lang.Override
  public String toString() {
    return value;
  }

  @JsonCreator(
      mode = JsonCreator.Mode.DELEGATING
  )
  public static TestCaseTemplateId of(String value) {
    return new TestCaseTemplateId(value);
  }

  public static TestCaseTemplateId valueOf(String value) {
    return of(value);
  }
}
