package com.rapiddocs.java.client.generators;

import com.rapiddocs.ir.model.commons.ErrorId;
import com.rapiddocs.ir.model.commons.TypeId;
import com.rapiddocs.ir.model.http.HttpEndpoint;
import com.rapiddocs.ir.model.http.HttpService;
import com.rapiddocs.ir.model.ir.IPackage;
import com.rapiddocs.ir.model.ir.Subpackage;
import com.rapiddocs.java.client.ClientGeneratorContext;
import com.rapiddocs.java.client.GeneratedClientOptions;
import com.rapiddocs.java.client.GeneratedEnvironmentsClass;
import com.rapiddocs.java.client.generators.endpoint.AbstractHttpEndpointMethodSpecFactory;
import com.rapiddocs.java.client.generators.endpoint.AsyncHttpEndpointMethodSpecFactory;
import com.rapiddocs.java.output.GeneratedJavaFile;
import com.rapiddocs.java.output.GeneratedJavaInterface;
import com.rapiddocs.java.output.GeneratedObjectMapper;
import com.squareup.javapoet.ClassName;
import java.util.Map;

public class AsyncClientGeneratorUtils extends AbstractClientGeneratorUtils {

    public AsyncClientGeneratorUtils(
            ClassName clientImplName,
            ClientGeneratorContext clientGeneratorContext,
            GeneratedClientOptions generatedClientOptions,
            GeneratedObjectMapper generatedObjectMapper,
            GeneratedEnvironmentsClass generatedEnvironmentsClass,
            Map<TypeId, GeneratedJavaInterface> allGeneratedInterfaces,
            GeneratedJavaFile generatedSuppliersFile,
            GeneratedJavaFile requestOptionsFile,
            IPackage rapiddocsPackage,
            Map<ErrorId, GeneratedJavaFile> generatedErrors) {
        super(
                clientImplName,
                clientGeneratorContext,
                generatedClientOptions,
                generatedObjectMapper,
                generatedEnvironmentsClass,
                allGeneratedInterfaces,
                generatedSuppliersFile,
                requestOptionsFile,
                rapiddocsPackage,
                generatedErrors);
    }

    @Override
    protected ClassName clientImplName(ClassName rawClientImplName) {
        return ClassName.get(rawClientImplName.packageName(), "Async" + rawClientImplName.simpleName());
    }

    @Override
    protected ClassName subpackageClientImplName(Subpackage subpackage) {
        ClassName syncClassName = generatorContext.getPoetClassNameFactory().getClientClassName(subpackage);
        return ClassName.get(syncClassName.packageName(), "Async" + syncClassName.simpleName());
    }

    @Override
    protected AbstractHttpEndpointMethodSpecFactory endpointMethodSpecFactory(
            HttpService httpService, HttpEndpoint httpEndpoint) {
        return new AsyncHttpEndpointMethodSpecFactory(
                httpService,
                httpEndpoint,
                generatedObjectMapper,
                generatorContext,
                generatedClientOptions,
                clientOptionsField,
                generatedEnvironmentsClass,
                allGeneratedInterfaces,
                generatedErrors);
    }
}
