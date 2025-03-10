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
import java.util.UUID;
import org.jetbrains.annotations.NotNull;

@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(builder = RunningResponse.Builder.class)
public final class RunningResponse {
    private final UUID submissionId;

    private final RunningSubmissionState state;

    private final Map<String, Object> additionalProperties;

    private RunningResponse(UUID submissionId, RunningSubmissionState state, Map<String, Object> additionalProperties) {
        this.submissionId = submissionId;
        this.state = state;
        this.additionalProperties = additionalProperties;
    }

    @JsonProperty("submissionId")
    public UUID getSubmissionId() {
        return submissionId;
    }

    @JsonProperty("state")
    public RunningSubmissionState getState() {
        return state;
    }

    @java.lang.Override
    public boolean equals(Object other) {
        if (this == other) return true;
        return other instanceof RunningResponse && equalTo((RunningResponse) other);
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    private boolean equalTo(RunningResponse other) {
        return submissionId.equals(other.submissionId) && state.equals(other.state);
    }

    @java.lang.Override
    public int hashCode() {
        return Objects.hash(this.submissionId, this.state);
    }

    @java.lang.Override
    public String toString() {
        return ObjectMappers.stringify(this);
    }

    public static SubmissionIdStage builder() {
        return new Builder();
    }

    public interface SubmissionIdStage {
        StateStage submissionId(@NotNull UUID submissionId);

        Builder from(RunningResponse other);
    }

    public interface StateStage {
        _FinalStage state(@NotNull RunningSubmissionState state);
    }

    public interface _FinalStage {
        RunningResponse build();
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class Builder implements SubmissionIdStage, StateStage, _FinalStage {
        private UUID submissionId;

        private RunningSubmissionState state;

        @JsonAnySetter
        private Map<String, Object> additionalProperties = new HashMap<>();

        private Builder() {}

        @java.lang.Override
        public Builder from(RunningResponse other) {
            submissionId(other.getSubmissionId());
            state(other.getState());
            return this;
        }

        @java.lang.Override
        @JsonSetter("submissionId")
        public StateStage submissionId(@NotNull UUID submissionId) {
            this.submissionId = Objects.requireNonNull(submissionId, "submissionId must not be null");
            return this;
        }

        @java.lang.Override
        @JsonSetter("state")
        public _FinalStage state(@NotNull RunningSubmissionState state) {
            this.state = Objects.requireNonNull(state, "state must not be null");
            return this;
        }

        @java.lang.Override
        public RunningResponse build() {
            return new RunningResponse(submissionId, state, additionalProperties);
        }
    }
}
