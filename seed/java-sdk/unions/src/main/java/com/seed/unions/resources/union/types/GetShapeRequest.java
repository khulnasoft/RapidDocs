/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
package com.seed.unions.resources.union.types;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.seed.unions.core.ObjectMappers;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import org.jetbrains.annotations.NotNull;

@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(builder = GetShapeRequest.Builder.class)
public final class GetShapeRequest {
    private final String id;

    private final Map<String, Object> additionalProperties;

    private GetShapeRequest(String id, Map<String, Object> additionalProperties) {
        this.id = id;
        this.additionalProperties = additionalProperties;
    }

    @JsonProperty("id")
    public String getId() {
        return id;
    }

    @java.lang.Override
    public boolean equals(Object other) {
        if (this == other) return true;
        return other instanceof GetShapeRequest && equalTo((GetShapeRequest) other);
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    private boolean equalTo(GetShapeRequest other) {
        return id.equals(other.id);
    }

    @java.lang.Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    @java.lang.Override
    public String toString() {
        return ObjectMappers.stringify(this);
    }

    public static IdStage builder() {
        return new Builder();
    }

    public interface IdStage {
        _FinalStage id(@NotNull String id);

        Builder from(GetShapeRequest other);
    }

    public interface _FinalStage {
        GetShapeRequest build();
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class Builder implements IdStage, _FinalStage {
        private String id;

        @JsonAnySetter
        private Map<String, Object> additionalProperties = new HashMap<>();

        private Builder() {}

        @java.lang.Override
        public Builder from(GetShapeRequest other) {
            id(other.getId());
            return this;
        }

        @java.lang.Override
        @JsonSetter("id")
        public _FinalStage id(@NotNull String id) {
            this.id = Objects.requireNonNull(id, "id must not be null");
            return this;
        }

        @java.lang.Override
        public GetShapeRequest build() {
            return new GetShapeRequest(id, additionalProperties);
        }
    }
}
