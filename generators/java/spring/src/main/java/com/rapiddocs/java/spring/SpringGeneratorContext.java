package com.rapiddocs.java.spring;

import com.rapiddocs.generator.exec.model.config.GeneratorConfig;
import com.rapiddocs.ir.model.auth.AuthScheme;
import com.rapiddocs.ir.model.ir.IntermediateRepresentation;
import com.rapiddocs.java.AbstractGeneratorContext;
import java.util.List;

public final class SpringGeneratorContext
        extends AbstractGeneratorContext<SpringLocalFilesPoetClassNameFactory, SpringCustomConfig> {

    public SpringGeneratorContext(
            IntermediateRepresentation ir,
            GeneratorConfig generatorConfig,
            SpringCustomConfig customConfig,
            List<AuthScheme> resolvedAuthSchemes) {
        super(
                ir,
                generatorConfig,
                customConfig,
                new SpringLocalFilesPoetClassNameFactory(customConfig.packagePrefix(), customConfig.packageLayout()),
                resolvedAuthSchemes);
    }

    @Override
    public boolean deserializeWithAdditionalProperties() {
        return false;
    }

    @Override
    public boolean builderNotNullChecks() {
        return true;
    }
}
