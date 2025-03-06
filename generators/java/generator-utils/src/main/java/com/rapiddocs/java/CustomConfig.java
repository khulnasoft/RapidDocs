package com.rapiddocs.java;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.rapiddocs.java.immutables.StagedBuilderImmutablesStyle;
import org.immutables.value.Value;

@Value.Immutable
@StagedBuilderImmutablesStyle
@JsonDeserialize(as = ImmutableCustomConfig.class)
public interface CustomConfig extends ICustomConfig {

    static ImmutableCustomConfig.Builder builder() {
        return ImmutableCustomConfig.builder();
    }
}
