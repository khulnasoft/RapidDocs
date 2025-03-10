/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

package resources.dataservice.requests;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import core.ObjectMappers;
import java.lang.Object;
import java.lang.String;
import java.util.Objects;
import java.util.Optional;
import types.Metadata;

@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(
    builder = DescribeRequest.Builder.class
)
public final class DescribeRequest {
  private final Optional<Metadata> filter;

  private DescribeRequest(Optional<Metadata> filter) {
    this.filter = filter;
  }

  @JsonProperty("filter")
  public Optional<Metadata> getFilter() {
    return filter;
  }

  @java.lang.Override
  public boolean equals(Object other) {
    if (this == other) return true;
    return other instanceof DescribeRequest && equalTo((DescribeRequest) other);
  }

  private boolean equalTo(DescribeRequest other) {
    return filter.equals(other.filter);
  }

  @java.lang.Override
  public int hashCode() {
    return Objects.hash(this.filter);
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
    private Optional<Metadata> filter = Optional.empty();

    private Builder() {
    }

    public Builder from(DescribeRequest other) {
      filter(other.getFilter());
      return this;
    }

    @JsonSetter(
        value = "filter",
        nulls = Nulls.SKIP
    )
    public Builder filter(Optional<Metadata> filter) {
      this.filter = filter;
      return this;
    }

    public Builder filter(Metadata filter) {
      this.filter = Optional.ofNullable(filter);
      return this;
    }

    public DescribeRequest build() {
      return new DescribeRequest(filter);
    }
  }
}
