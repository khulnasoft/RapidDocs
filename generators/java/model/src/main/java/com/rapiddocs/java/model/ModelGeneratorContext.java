package com.rapiddocs.java.model;

import com.rapiddocs.generator.exec.model.config.GeneratorConfig;
import com.rapiddocs.ir.model.ir.IntermediateRepresentation;
import com.rapiddocs.java.AbstractGeneratorContext;
import com.rapiddocs.java.CustomConfig;
import java.util.List;

public class ModelGeneratorContext extends AbstractGeneratorContext<ModelPoetClassNameFactory, CustomConfig> {

    public static final List<com.rapiddocs.ir.model.auth.AuthScheme> NO_AUTH_SCHEMES = List.of();

    public ModelGeneratorContext(
            IntermediateRepresentation ir, GeneratorConfig generatorConfig, CustomConfig customConfig) {
        super(
                ir,
                generatorConfig,
                customConfig,
                new ModelPoetClassNameFactory(ir, generatorConfig.getOrganization(), customConfig.packageLayout()),
                NO_AUTH_SCHEMES);
    }

    @Override
    public final boolean deserializeWithAdditionalProperties() {
        return false;
    }

    @Override
    public boolean builderNotNullChecks() {
        return false;
    }
}
