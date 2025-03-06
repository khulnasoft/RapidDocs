package com.rapiddocs.java.client.generators.endpoint;

import com.rapiddocs.ir.model.commons.ErrorId;
import com.rapiddocs.ir.model.commons.TypeId;
import com.rapiddocs.ir.model.http.HttpEndpoint;
import com.rapiddocs.ir.model.http.HttpService;
import com.rapiddocs.java.client.ClientGeneratorContext;
import com.rapiddocs.java.client.GeneratedClientOptions;
import com.rapiddocs.java.client.GeneratedEnvironmentsClass;
import com.rapiddocs.java.output.GeneratedJavaFile;
import com.rapiddocs.java.output.GeneratedJavaInterface;
import com.rapiddocs.java.output.GeneratedObjectMapper;
import com.squareup.javapoet.ClassName;
import com.squareup.javapoet.FieldSpec;
import java.util.Map;

public class SyncHttpEndpointMethodSpecFactory extends AbstractHttpEndpointMethodSpecFactory {

    public SyncHttpEndpointMethodSpecFactory(
            HttpService httpService,
            HttpEndpoint httpEndpoint,
            GeneratedObjectMapper generatedObjectMapper,
            ClientGeneratorContext clientGeneratorContext,
            GeneratedClientOptions generatedClientOptions,
            FieldSpec clientOptionsField,
            GeneratedEnvironmentsClass generatedEnvironmentsClass,
            Map<TypeId, GeneratedJavaInterface> allGeneratedInterfaces,
            Map<ErrorId, GeneratedJavaFile> generatedErrors) {
        super(
                httpService,
                httpEndpoint,
                generatedObjectMapper,
                clientGeneratorContext,
                generatedClientOptions,
                clientOptionsField,
                generatedEnvironmentsClass,
                allGeneratedInterfaces,
                generatedErrors);
    }

    @Override
    public AbstractHttpResponseParserGenerator responseParserGenerator(
            AbstractEndpointWriterVariableNameContext variables,
            ClientGeneratorContext clientGeneratorContext,
            HttpEndpoint httpEndpoint,
            ClassName apiErrorClassName,
            ClassName baseErrorClassName,
            GeneratedClientOptions generatedClientOptions,
            GeneratedObjectMapper generatedObjectMapper,
            FieldSpec clientOptionsField,
            Map<ErrorId, GeneratedJavaFile> generatedErrors) {
        return new SyncHttpResponseParserGenerator(
                variables,
                clientGeneratorContext,
                httpEndpoint,
                apiErrorClassName,
                baseErrorClassName,
                generatedClientOptions,
                generatedObjectMapper,
                clientOptionsField,
                generatedErrors);
    }

    @Override
    public HttpEndpointMethodSpecsFactory httpEndpointMethodSpecsFactory() {
        return new SyncHttpEndpointMethodSpecsFactory();
    }
}
