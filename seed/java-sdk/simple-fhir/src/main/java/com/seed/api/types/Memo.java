/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
package com.seed.api.types;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.seed.api.core.ObjectMappers;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import org.jetbrains.annotations.NotNull;

@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(builder = Memo.Builder.class)
public final class Memo {
    private final String description;

    private final Optional<Account> account;

    private final Map<String, Object> additionalProperties;

    private Memo(String description, Optional<Account> account, Map<String, Object> additionalProperties) {
        this.description = description;
        this.account = account;
        this.additionalProperties = additionalProperties;
    }

    @JsonProperty("description")
    public String getDescription() {
        return description;
    }

    @JsonProperty("account")
    public Optional<Account> getAccount() {
        return account;
    }

    @java.lang.Override
    public boolean equals(Object other) {
        if (this == other) return true;
        return other instanceof Memo && equalTo((Memo) other);
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    private boolean equalTo(Memo other) {
        return description.equals(other.description) && account.equals(other.account);
    }

    @java.lang.Override
    public int hashCode() {
        return Objects.hash(this.description, this.account);
    }

    @java.lang.Override
    public String toString() {
        return ObjectMappers.stringify(this);
    }

    public static DescriptionStage builder() {
        return new Builder();
    }

    public interface DescriptionStage {
        _FinalStage description(@NotNull String description);

        Builder from(Memo other);
    }

    public interface _FinalStage {
        Memo build();

        _FinalStage account(Optional<Account> account);

        _FinalStage account(Account account);
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class Builder implements DescriptionStage, _FinalStage {
        private String description;

        private Optional<Account> account = Optional.empty();

        @JsonAnySetter
        private Map<String, Object> additionalProperties = new HashMap<>();

        private Builder() {}

        @java.lang.Override
        public Builder from(Memo other) {
            description(other.getDescription());
            account(other.getAccount());
            return this;
        }

        @java.lang.Override
        @JsonSetter("description")
        public _FinalStage description(@NotNull String description) {
            this.description = Objects.requireNonNull(description, "description must not be null");
            return this;
        }

        @java.lang.Override
        public _FinalStage account(Account account) {
            this.account = Optional.ofNullable(account);
            return this;
        }

        @java.lang.Override
        @JsonSetter(value = "account", nulls = Nulls.SKIP)
        public _FinalStage account(Optional<Account> account) {
            this.account = account;
            return this;
        }

        @java.lang.Override
        public Memo build() {
            return new Memo(description, account, additionalProperties);
        }
    }
}
