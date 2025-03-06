package com.rapiddocs.java.output;

import com.rapiddocs.ir.model.auth.AuthScheme;
import com.rapiddocs.java.immutables.StagedBuilderImmutablesStyle;
import org.immutables.value.Value;

@Value.Immutable
@StagedBuilderImmutablesStyle
public abstract class GeneratedAuthFiles extends AbstractGeneratedJavaFile {

    public abstract AuthScheme authScheme();

    public static ImmutableGeneratedAuthFiles.ClassNameBuildStage builder() {
        return ImmutableGeneratedAuthFiles.builder();
    }
}
