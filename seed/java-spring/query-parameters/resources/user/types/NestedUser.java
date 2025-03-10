/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

package resources.user.types;

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
    builder = NestedUser.Builder.class
)
public final class NestedUser {
  private final String name;

  private final User user;

  private NestedUser(String name, User user) {
    this.name = name;
    this.user = user;
  }

  @JsonProperty("name")
  public String getName() {
    return name;
  }

  @JsonProperty("user")
  public User getUser() {
    return user;
  }

  @java.lang.Override
  public boolean equals(Object other) {
    if (this == other) return true;
    return other instanceof NestedUser && equalTo((NestedUser) other);
  }

  private boolean equalTo(NestedUser other) {
    return name.equals(other.name) && user.equals(other.user);
  }

  @java.lang.Override
  public int hashCode() {
    return Objects.hash(this.name, this.user);
  }

  @java.lang.Override
  public String toString() {
    return ObjectMappers.stringify(this);
  }

  public static NameStage builder() {
    return new Builder();
  }

  public interface NameStage {
    UserStage name(@NotNull String name);

    Builder from(NestedUser other);
  }

  public interface UserStage {
    _FinalStage user(@NotNull User user);
  }

  public interface _FinalStage {
    NestedUser build();
  }

  @JsonIgnoreProperties(
      ignoreUnknown = true
  )
  public static final class Builder implements NameStage, UserStage, _FinalStage {
    private String name;

    private User user;

    private Builder() {
    }

    @java.lang.Override
    public Builder from(NestedUser other) {
      name(other.getName());
      user(other.getUser());
      return this;
    }

    @java.lang.Override
    @JsonSetter("name")
    public UserStage name(@NotNull String name) {
      this.name = Objects.requireNonNull(name, "name must not be null");
      return this;
    }

    @java.lang.Override
    @JsonSetter("user")
    public _FinalStage user(@NotNull User user) {
      this.user = Objects.requireNonNull(user, "user must not be null");
      return this;
    }

    @java.lang.Override
    public NestedUser build() {
      return new NestedUser(name, user);
    }
  }
}
