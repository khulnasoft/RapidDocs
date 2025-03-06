package com.rapiddocs.java.client.generators;

import com.rapiddocs.ir.model.commons.ErrorId;
import com.rapiddocs.ir.model.commons.TypeId;
import com.rapiddocs.ir.model.ir.Subpackage;
import com.rapiddocs.java.AbstractGeneratorContext;
import com.rapiddocs.java.client.ClientGeneratorContext;
import com.rapiddocs.java.client.GeneratedClientOptions;
import com.rapiddocs.java.client.GeneratedEnvironmentsClass;
import com.rapiddocs.java.output.GeneratedJavaFile;
import com.rapiddocs.java.output.GeneratedJavaInterface;
import com.rapiddocs.java.output.GeneratedObjectMapper;
import java.util.Map;

public class AsyncSubpackageClientGenerator extends AbstractSubpackageClientGenerator {

    public AsyncSubpackageClientGenerator(
            Subpackage subpackage,
            AbstractGeneratorContext<?, ?> generatorContext,
            GeneratedObjectMapper generatedObjectMapper,
            ClientGeneratorContext clientGeneratorContext,
            GeneratedClientOptions generatedClientOptions,
            GeneratedJavaFile generatedSuppliersFile,
            GeneratedEnvironmentsClass generatedEnvironmentsClass,
            GeneratedJavaFile requestOptionsFile,
            Map<TypeId, GeneratedJavaInterface> allGeneratedInterfaces,
            Map<ErrorId, GeneratedJavaFile> generatedErrors) {
        super(
                subpackage,
                generatorContext,
                generatedObjectMapper,
                clientGeneratorContext,
                generatedClientOptions,
                generatedSuppliersFile,
                generatedEnvironmentsClass,
                requestOptionsFile,
                allGeneratedInterfaces,
                generatedErrors);
    }

    @Override
    protected AbstractClientGeneratorUtils clientGeneratorUtils() {
        return new AsyncClientGeneratorUtils(
                className,
                clientGeneratorContext,
                generatedClientOptions,
                generatedObjectMapper,
                generatedEnvironmentsClass,
                allGeneratedInterfaces,
                generatedSuppliersFile,
                requestOptionsFile,
                subpackage,
                generatedErrors);
    }
}
