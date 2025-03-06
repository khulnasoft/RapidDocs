package com.rapiddocs.java.client.generators.endpoint;

import com.rapiddocs.ir.model.http.FileProperty;
import com.rapiddocs.ir.model.http.HttpEndpoint;
import com.rapiddocs.ir.model.http.HttpService;
import com.rapiddocs.ir.model.http.SdkRequest;
import com.rapiddocs.java.client.ClientGeneratorContext;
import com.rapiddocs.java.client.GeneratedWrappedRequest;
import com.rapiddocs.java.client.generators.visitors.FilePropertyIsOptional;
import com.rapiddocs.java.client.generators.visitors.GetFilePropertyKey;
import com.rapiddocs.java.generators.object.EnrichedObjectProperty;
import com.squareup.javapoet.ClassName;
import com.squareup.javapoet.ParameterSpec;
import com.squareup.javapoet.ParameterizedTypeName;
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class WrappedRequestEndpointWriterVariableNameContext extends AbstractEndpointWriterVariableNameContext {

    private final GeneratedWrappedRequest generatedWrappedRequest;
    private final SdkRequest sdkRequest;

    private final String requestParameterName;

    public WrappedRequestEndpointWriterVariableNameContext(
            ClientGeneratorContext clientGeneratorContext,
            HttpService httpService,
            HttpEndpoint httpEndpoint,
            SdkRequest sdkRequest,
            GeneratedWrappedRequest generatedWrappedRequest) {
        super(clientGeneratorContext, httpService, httpEndpoint);
        this.generatedWrappedRequest = generatedWrappedRequest;
        this.sdkRequest = sdkRequest;
        this.requestParameterName =
                sdkRequest.getRequestParameterName().getCamelCase().getSafeName();
        initializeCollections();
    }

    @Override
    public Optional<SdkRequest> sdkRequest() {
        return Optional.of(this.sdkRequest);
    }

    @Override
    public List<EnrichedObjectProperty> getQueryParams() {
        return generatedWrappedRequest.queryParams();
    }

    @Override
    public List<ParameterSpec> additionalParameters() {
        List<ParameterSpec> parameterSpecs = new ArrayList<>();
        if (generatedWrappedRequest.requestBodyGetter().isPresent()
                && generatedWrappedRequest.requestBodyGetter().get()
                        instanceof GeneratedWrappedRequest.FileUploadRequestBodyGetters) {
            GeneratedWrappedRequest.FileUploadRequestBodyGetters fileUploadRequest =
                    (GeneratedWrappedRequest.FileUploadRequestBodyGetters)
                            (generatedWrappedRequest.requestBodyGetter().get());
            fileUploadRequest.fileProperties().forEach(fileProperty -> {
                ParameterSpec fileParameter = ParameterSpec.builder(
                                fileProperty.visit(new FilePropertyIsOptional())
                                        ? ParameterizedTypeName.get(Optional.class, File.class)
                                        : ClassName.get(File.class),
                                getFilePropertyParameterName(fileProperty))
                        .build();
                parameterSpecs.add(fileParameter);
            });
        }
        parameterSpecs.add(requestParameterSpec().get());
        return parameterSpecs;
    }

    @Override
    public Optional<ParameterSpec> requestParameterSpec() {
        return Optional.of(ParameterSpec.builder(generatedWrappedRequest.getClassName(), requestParameterName)
                .build());
    }

    public static String getFilePropertyParameterName(FileProperty fileProperty) {
        return fileProperty
                .visit(new GetFilePropertyKey())
                .getName()
                .getCamelCase()
                .getSafeName();
    }
}
