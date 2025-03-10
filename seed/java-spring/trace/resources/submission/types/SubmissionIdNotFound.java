/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

package resources.submission.types;

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

@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(
    builder = SubmissionIdNotFound.Builder.class
)
public final class SubmissionIdNotFound {
  private final SubmissionId missingSubmissionId;

  private SubmissionIdNotFound(SubmissionId missingSubmissionId) {
    this.missingSubmissionId = missingSubmissionId;
  }

  @JsonProperty("missingSubmissionId")
  public SubmissionId getMissingSubmissionId() {
    return missingSubmissionId;
  }

  @java.lang.Override
  public boolean equals(Object other) {
    if (this == other) return true;
    return other instanceof SubmissionIdNotFound && equalTo((SubmissionIdNotFound) other);
  }

  private boolean equalTo(SubmissionIdNotFound other) {
    return missingSubmissionId.equals(other.missingSubmissionId);
  }

  @java.lang.Override
  public int hashCode() {
    return Objects.hash(this.missingSubmissionId);
  }

  @java.lang.Override
  public String toString() {
    return ObjectMappers.stringify(this);
  }

  public static MissingSubmissionIdStage builder() {
    return new Builder();
  }

  public interface MissingSubmissionIdStage {
    _FinalStage missingSubmissionId(@NotNull SubmissionId missingSubmissionId);

    Builder from(SubmissionIdNotFound other);
  }

  public interface _FinalStage {
    SubmissionIdNotFound build();
  }

  @JsonIgnoreProperties(
      ignoreUnknown = true
  )
  public static final class Builder implements MissingSubmissionIdStage, _FinalStage {
    private SubmissionId missingSubmissionId;

    private Builder() {
    }

    @java.lang.Override
    public Builder from(SubmissionIdNotFound other) {
      missingSubmissionId(other.getMissingSubmissionId());
      return this;
    }

    @java.lang.Override
    @JsonSetter("missingSubmissionId")
    public _FinalStage missingSubmissionId(@NotNull SubmissionId missingSubmissionId) {
      this.missingSubmissionId = Objects.requireNonNull(missingSubmissionId, "missingSubmissionId must not be null");
      return this;
    }

    @java.lang.Override
    public SubmissionIdNotFound build() {
      return new SubmissionIdNotFound(missingSubmissionId);
    }
  }
}
