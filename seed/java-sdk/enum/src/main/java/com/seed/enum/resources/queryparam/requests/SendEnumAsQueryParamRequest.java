/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

package com.seed.enum.resources.queryparam.requests;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.seed.enum.core.ObjectMappers;
import com.seed.enum.types.Operand;
import java.lang.Object;
import java.lang.String;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
@JsonDeserialize(
    builder = SendEnumAsQueryParamRequest.Builder.class
)
public final class SendEnumAsQueryParamRequest {
  private final Optional<Operand> value;

  private final Map<String, Object> additionalProperties;

  private SendEnumAsQueryParamRequest(Optional<Operand> value,
      Map<String, Object> additionalProperties) {
    this.value = value;
    this.additionalProperties = additionalProperties;
  }

  @JsonProperty("value")
  public Optional<Operand> getValue() {
    return value;
  }

  @java.lang.Override
  public boolean equals(Object other) {
    if (this == other) return true;
    return other instanceof SendEnumAsQueryParamRequest && equalTo((SendEnumAsQueryParamRequest) other);
  }

  @JsonAnyGetter
  public Map<String, Object> getAdditionalProperties() {
    return this.additionalProperties;
  }

  private boolean equalTo(SendEnumAsQueryParamRequest other) {
    return value.equals(other.value);
  }

  @java.lang.Override
  public int hashCode() {
    return Objects.hash(this.value);
  }

  @java.lang.Override
  public String toString() {
    return ObjectMappers.stringify(this);
  }

  public static Builder builder() {
    return new Builder();
  }

  @JsonIgnoreProperties(
      ignoreUnknown = true
  )
  public static final class Builder {
    private Optional<Operand> value = Optional.empty();

    @JsonAnySetter
    private Map<String, Object> additionalProperties = new HashMap<>();

    private Builder() {
    }

    public Builder from(SendEnumAsQueryParamRequest other) {
      value(other.getValue());
      return this;
    }

    @JsonSetter(
        value = "value",
        nulls = Nulls.SKIP
    )
    public Builder value(Optional<Operand> value) {
      this.value = value;
      return this;
    }

    public Builder value(Operand value) {
      this.value = Optional.of(value);
      return this;
    }

    public SendEnumAsQueryParamRequest build() {
      return new SendEnumAsQueryParamRequest(value, additionalProperties);
    }
  }
}
