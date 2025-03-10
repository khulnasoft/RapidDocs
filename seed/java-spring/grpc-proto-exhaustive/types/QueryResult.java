/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

package types;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import core.ObjectMappers;
import java.lang.Object;
import java.lang.String;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(
    builder = QueryResult.Builder.class
)
public final class QueryResult {
  private final Optional<List<ScoredColumn>> matches;

  private final Optional<String> namespace;

  private QueryResult(Optional<List<ScoredColumn>> matches, Optional<String> namespace) {
    this.matches = matches;
    this.namespace = namespace;
  }

  @JsonProperty("matches")
  public Optional<List<ScoredColumn>> getMatches() {
    return matches;
  }

  @JsonProperty("namespace")
  public Optional<String> getNamespace() {
    return namespace;
  }

  @java.lang.Override
  public boolean equals(Object other) {
    if (this == other) return true;
    return other instanceof QueryResult && equalTo((QueryResult) other);
  }

  private boolean equalTo(QueryResult other) {
    return matches.equals(other.matches) && namespace.equals(other.namespace);
  }

  @java.lang.Override
  public int hashCode() {
    return Objects.hash(this.matches, this.namespace);
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
    private Optional<List<ScoredColumn>> matches = Optional.empty();

    private Optional<String> namespace = Optional.empty();

    private Builder() {
    }

    public Builder from(QueryResult other) {
      matches(other.getMatches());
      namespace(other.getNamespace());
      return this;
    }

    @JsonSetter(
        value = "matches",
        nulls = Nulls.SKIP
    )
    public Builder matches(Optional<List<ScoredColumn>> matches) {
      this.matches = matches;
      return this;
    }

    public Builder matches(List<ScoredColumn> matches) {
      this.matches = Optional.ofNullable(matches);
      return this;
    }

    @JsonSetter(
        value = "namespace",
        nulls = Nulls.SKIP
    )
    public Builder namespace(Optional<String> namespace) {
      this.namespace = namespace;
      return this;
    }

    public Builder namespace(String namespace) {
      this.namespace = Optional.ofNullable(namespace);
      return this;
    }

    public QueryResult build() {
      return new QueryResult(matches, namespace);
    }
  }
}
