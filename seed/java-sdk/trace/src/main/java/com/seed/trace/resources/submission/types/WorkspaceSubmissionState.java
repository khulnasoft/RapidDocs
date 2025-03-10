/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
package com.seed.trace.resources.submission.types;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.seed.trace.core.ObjectMappers;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import org.jetbrains.annotations.NotNull;

@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(builder = WorkspaceSubmissionState.Builder.class)
public final class WorkspaceSubmissionState {
    private final WorkspaceSubmissionStatus status;

    private final Map<String, Object> additionalProperties;

    private WorkspaceSubmissionState(WorkspaceSubmissionStatus status, Map<String, Object> additionalProperties) {
        this.status = status;
        this.additionalProperties = additionalProperties;
    }

    @JsonProperty("status")
    public WorkspaceSubmissionStatus getStatus() {
        return status;
    }

    @java.lang.Override
    public boolean equals(Object other) {
        if (this == other) return true;
        return other instanceof WorkspaceSubmissionState && equalTo((WorkspaceSubmissionState) other);
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    private boolean equalTo(WorkspaceSubmissionState other) {
        return status.equals(other.status);
    }

    @java.lang.Override
    public int hashCode() {
        return Objects.hash(this.status);
    }

    @java.lang.Override
    public String toString() {
        return ObjectMappers.stringify(this);
    }

    public static StatusStage builder() {
        return new Builder();
    }

    public interface StatusStage {
        _FinalStage status(@NotNull WorkspaceSubmissionStatus status);

        Builder from(WorkspaceSubmissionState other);
    }

    public interface _FinalStage {
        WorkspaceSubmissionState build();
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class Builder implements StatusStage, _FinalStage {
        private WorkspaceSubmissionStatus status;

        @JsonAnySetter
        private Map<String, Object> additionalProperties = new HashMap<>();

        private Builder() {}

        @java.lang.Override
        public Builder from(WorkspaceSubmissionState other) {
            status(other.getStatus());
            return this;
        }

        @java.lang.Override
        @JsonSetter("status")
        public _FinalStage status(@NotNull WorkspaceSubmissionStatus status) {
            this.status = Objects.requireNonNull(status, "status must not be null");
            return this;
        }

        @java.lang.Override
        public WorkspaceSubmissionState build() {
            return new WorkspaceSubmissionState(status, additionalProperties);
        }
    }
}
