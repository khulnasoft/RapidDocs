package com.rapiddocs.java.output.gradle;

import com.rapiddocs.java.immutables.StagedBuilderImmutablesStyle;
import org.immutables.value.Value;

@Value.Immutable
@StagedBuilderImmutablesStyle
public abstract class GradleRepository {

    public abstract String url();

    public static ImmutableGradleRepository.UrlBuildStage builder() {
        return ImmutableGradleRepository.builder();
    }
}
