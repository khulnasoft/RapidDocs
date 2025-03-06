package com.rapiddocs.java.client;

import com.rapiddocs.generator.exec.model.config.GeneratorConfig;
import com.rapiddocs.ir.model.auth.AuthScheme;
import com.rapiddocs.ir.model.ir.IntermediateRepresentation;
import com.rapiddocs.java.AbstractGeneratorContext;
import java.util.List;

public final class ClientGeneratorContext
        extends AbstractGeneratorContext<ClientPoetClassNameFactory, JavaSdkCustomConfig> {

    public ClientGeneratorContext(
            IntermediateRepresentation ir,
            GeneratorConfig generatorConfig,
            JavaSdkCustomConfig customConfig,
            ClientPoetClassNameFactory clientPoetClassNameFactory,
            List<AuthScheme> resolvedAuthSchemes) {
        super(ir, generatorConfig, customConfig, clientPoetClassNameFactory, resolvedAuthSchemes);
    }

    @Override
    public boolean deserializeWithAdditionalProperties() {
        return true;
    }

    @Override
    public boolean builderNotNullChecks() {
        return true;
    }
}
