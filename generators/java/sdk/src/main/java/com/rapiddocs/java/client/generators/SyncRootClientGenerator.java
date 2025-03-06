package com.rapiddocs.java.client.generators;

import com.rapiddocs.ir.model.commons.ErrorId;
import com.rapiddocs.ir.model.commons.TypeId;
import com.rapiddocs.java.AbstractGeneratorContext;
import com.rapiddocs.java.client.ClientGeneratorContext;
import com.rapiddocs.java.client.GeneratedClientOptions;
import com.rapiddocs.java.client.GeneratedEnvironmentsClass;
import com.rapiddocs.java.output.GeneratedJavaFile;
import com.rapiddocs.java.output.GeneratedJavaInterface;
import com.rapiddocs.java.output.GeneratedObjectMapper;
import java.util.Map;
import java.util.Optional;

public class SyncRootClientGenerator extends AbstractRootClientGenerator {

    public SyncRootClientGenerator(
            AbstractGeneratorContext<?, ?> generatorContext,
            GeneratedObjectMapper generatedObjectMapper,
            ClientGeneratorContext clientGeneratorContext,
            GeneratedClientOptions generatedClientOptions,
            GeneratedJavaFile generatedSuppliersFile,
            GeneratedEnvironmentsClass generatedEnvironmentsClass,
            GeneratedJavaFile requestOptionsFile,
            Map<TypeId, GeneratedJavaInterface> allGeneratedInterfaces,
            Optional<GeneratedJavaFile> generatedOAuthTokenSupplier,
            Map<ErrorId, GeneratedJavaFile> generatedErrors) {
        super(
                generatorContext,
                generatedObjectMapper,
                clientGeneratorContext,
                generatedClientOptions,
                generatedSuppliersFile,
                generatedEnvironmentsClass,
                requestOptionsFile,
                allGeneratedInterfaces,
                generatedOAuthTokenSupplier,
                generatedErrors);
    }

    @Override
    protected AbstractClientGeneratorUtils clientGeneratorUtils() {
        return new SyncClientGeneratorUtils(
                className,
                clientGeneratorContext,
                generatedClientOptions,
                generatedObjectMapper,
                generatedEnvironmentsClass,
                allGeneratedInterfaces,
                generatedSuppliersFile,
                requestOptionsFile,
                generatorContext.getIr().getRootPackage(),
                generatedErrors);
    }
}
