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
import com.fasterxml.jackson.annotation.Nulls;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.seed.trace.core.ObjectMappers;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(builder = GetExecutionSessionStateResponse.Builder.class)
public final class GetExecutionSessionStateResponse {
    private final Map<String, ExecutionSessionState> states;

    private final Optional<Integer> numWarmingInstances;

    private final List<String> warmingSessionIds;

    private final Map<String, Object> additionalProperties;

    private GetExecutionSessionStateResponse(
            Map<String, ExecutionSessionState> states,
            Optional<Integer> numWarmingInstances,
            List<String> warmingSessionIds,
            Map<String, Object> additionalProperties) {
        this.states = states;
        this.numWarmingInstances = numWarmingInstances;
        this.warmingSessionIds = warmingSessionIds;
        this.additionalProperties = additionalProperties;
    }

    @JsonProperty("states")
    public Map<String, ExecutionSessionState> getStates() {
        return states;
    }

    @JsonProperty("numWarmingInstances")
    public Optional<Integer> getNumWarmingInstances() {
        return numWarmingInstances;
    }

    @JsonProperty("warmingSessionIds")
    public List<String> getWarmingSessionIds() {
        return warmingSessionIds;
    }

    @java.lang.Override
    public boolean equals(Object other) {
        if (this == other) return true;
        return other instanceof GetExecutionSessionStateResponse && equalTo((GetExecutionSessionStateResponse) other);
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    private boolean equalTo(GetExecutionSessionStateResponse other) {
        return states.equals(other.states)
                && numWarmingInstances.equals(other.numWarmingInstances)
                && warmingSessionIds.equals(other.warmingSessionIds);
    }

    @java.lang.Override
    public int hashCode() {
        return Objects.hash(this.states, this.numWarmingInstances, this.warmingSessionIds);
    }

    @java.lang.Override
    public String toString() {
        return ObjectMappers.stringify(this);
    }

    public static Builder builder() {
        return new Builder();
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class Builder {
        private Map<String, ExecutionSessionState> states = new LinkedHashMap<>();

        private Optional<Integer> numWarmingInstances = Optional.empty();

        private List<String> warmingSessionIds = new ArrayList<>();

        @JsonAnySetter
        private Map<String, Object> additionalProperties = new HashMap<>();

        private Builder() {}

        public Builder from(GetExecutionSessionStateResponse other) {
            states(other.getStates());
            numWarmingInstances(other.getNumWarmingInstances());
            warmingSessionIds(other.getWarmingSessionIds());
            return this;
        }

        @JsonSetter(value = "states", nulls = Nulls.SKIP)
        public Builder states(Map<String, ExecutionSessionState> states) {
            this.states.clear();
            this.states.putAll(states);
            return this;
        }

        public Builder putAllStates(Map<String, ExecutionSessionState> states) {
            this.states.putAll(states);
            return this;
        }

        public Builder states(String key, ExecutionSessionState value) {
            this.states.put(key, value);
            return this;
        }

        @JsonSetter(value = "numWarmingInstances", nulls = Nulls.SKIP)
        public Builder numWarmingInstances(Optional<Integer> numWarmingInstances) {
            this.numWarmingInstances = numWarmingInstances;
            return this;
        }

        public Builder numWarmingInstances(Integer numWarmingInstances) {
            this.numWarmingInstances = Optional.ofNullable(numWarmingInstances);
            return this;
        }

        @JsonSetter(value = "warmingSessionIds", nulls = Nulls.SKIP)
        public Builder warmingSessionIds(List<String> warmingSessionIds) {
            this.warmingSessionIds.clear();
            this.warmingSessionIds.addAll(warmingSessionIds);
            return this;
        }

        public Builder addWarmingSessionIds(String warmingSessionIds) {
            this.warmingSessionIds.add(warmingSessionIds);
            return this;
        }

        public Builder addAllWarmingSessionIds(List<String> warmingSessionIds) {
            this.warmingSessionIds.addAll(warmingSessionIds);
            return this;
        }

        public GetExecutionSessionStateResponse build() {
            return new GetExecutionSessionStateResponse(
                    states, numWarmingInstances, warmingSessionIds, additionalProperties);
        }
    }
}
