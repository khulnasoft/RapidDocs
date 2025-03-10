/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

package resources.users.types;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import core.ObjectMappers;
import java.lang.Object;
import java.lang.String;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(
    builder = UsernameContainer.Builder.class
)
public final class UsernameContainer {
  private final List<String> results;

  private UsernameContainer(List<String> results) {
    this.results = results;
  }

  @JsonProperty("results")
  public List<String> getResults() {
    return results;
  }

  @java.lang.Override
  public boolean equals(Object other) {
    if (this == other) return true;
    return other instanceof UsernameContainer && equalTo((UsernameContainer) other);
  }

  private boolean equalTo(UsernameContainer other) {
    return results.equals(other.results);
  }

  @java.lang.Override
  public int hashCode() {
    return Objects.hash(this.results);
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
    private List<String> results = new ArrayList<>();

    private Builder() {
    }

    public Builder from(UsernameContainer other) {
      results(other.getResults());
      return this;
    }

    @JsonSetter(
        value = "results",
        nulls = Nulls.SKIP
    )
    public Builder results(List<String> results) {
      this.results.clear();
      this.results.addAll(results);
      return this;
    }

    public Builder addResults(String results) {
      this.results.add(results);
      return this;
    }

    public Builder addAllResults(List<String> results) {
      this.results.addAll(results);
      return this;
    }

    public UsernameContainer build() {
      return new UsernameContainer(results);
    }
  }
}
