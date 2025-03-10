/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

package resources.a.d.types.types;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import java.lang.Object;
import java.lang.String;

public final class Foo {
  private final String value;

  private Foo(String value) {
    this.value = value;
  }

  @JsonValue
  public String get() {
    return this.value;
  }

  @java.lang.Override
  public boolean equals(Object other) {
    return this == other || (other instanceof Foo && this.value.equals(((Foo) other).value));
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
  public static Foo of(String value) {
    return new Foo(value);
  }

  public static Foo valueOf(String value) {
    return of(value);
  }
}
