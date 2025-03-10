/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

package resources.inlinedrequests.requests;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import core.ObjectMappers;
import java.lang.Object;
import java.lang.String;
import java.util.Objects;
import org.jetbrains.annotations.NotNull;
import resources.types.object.types.ObjectWithOptionalField;

@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(
    builder = PostWithObjectBody.Builder.class
)
public final class PostWithObjectBody {
  private final String string;

  private final int integer;

  private final ObjectWithOptionalField nestedObject;

  private PostWithObjectBody(String string, int integer, ObjectWithOptionalField nestedObject) {
    this.string = string;
    this.integer = integer;
    this.nestedObject = nestedObject;
  }

  @JsonProperty("string")
  public String getString() {
    return string;
  }

  @JsonProperty("integer")
  public int getInteger() {
    return integer;
  }

  @JsonProperty("NestedObject")
  public ObjectWithOptionalField getNestedObject() {
    return nestedObject;
  }

  @java.lang.Override
  public boolean equals(Object other) {
    if (this == other) return true;
    return other instanceof PostWithObjectBody && equalTo((PostWithObjectBody) other);
  }

  private boolean equalTo(PostWithObjectBody other) {
    return string.equals(other.string) && integer == other.integer && nestedObject.equals(other.nestedObject);
  }

  @java.lang.Override
  public int hashCode() {
    return Objects.hash(this.string, this.integer, this.nestedObject);
  }

  @java.lang.Override
  public String toString() {
    return ObjectMappers.stringify(this);
  }

  public static StringStage builder() {
    return new Builder();
  }

  public interface StringStage {
    IntegerStage string(@NotNull String string);

    Builder from(PostWithObjectBody other);
  }

  public interface IntegerStage {
    NestedObjectStage integer(int integer);
  }

  public interface NestedObjectStage {
    _FinalStage nestedObject(@NotNull ObjectWithOptionalField nestedObject);
  }

  public interface _FinalStage {
    PostWithObjectBody build();
  }

  @JsonIgnoreProperties(
      ignoreUnknown = true
  )
  public static final class Builder implements StringStage, IntegerStage, NestedObjectStage, _FinalStage {
    private String string;

    private int integer;

    private ObjectWithOptionalField nestedObject;

    private Builder() {
    }

    @java.lang.Override
    public Builder from(PostWithObjectBody other) {
      string(other.getString());
      integer(other.getInteger());
      nestedObject(other.getNestedObject());
      return this;
    }

    @java.lang.Override
    @JsonSetter("string")
    public IntegerStage string(@NotNull String string) {
      this.string = Objects.requireNonNull(string, "string must not be null");
      return this;
    }

    @java.lang.Override
    @JsonSetter("integer")
    public NestedObjectStage integer(int integer) {
      this.integer = integer;
      return this;
    }

    @java.lang.Override
    @JsonSetter("NestedObject")
    public _FinalStage nestedObject(@NotNull ObjectWithOptionalField nestedObject) {
      this.nestedObject = Objects.requireNonNull(nestedObject, "nestedObject must not be null");
      return this;
    }

    @java.lang.Override
    public PostWithObjectBody build() {
      return new PostWithObjectBody(string, integer, nestedObject);
    }
  }
}
