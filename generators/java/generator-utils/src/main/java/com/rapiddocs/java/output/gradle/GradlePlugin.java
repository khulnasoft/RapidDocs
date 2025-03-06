package com.rapiddocs.java.output.gradle;

import com.rapiddocs.java.immutables.StagedBuilderImmutablesStyle;
import java.util.Optional;
import org.immutables.value.Value;

@Value.Immutable
@StagedBuilderImmutablesStyle
public abstract class GradlePlugin {

    public abstract String pluginId();

    public abstract Optional<String> version();

    public static ImmutableGradlePlugin.PluginIdBuildStage builder() {
        return ImmutableGradlePlugin.builder();
    }
}
