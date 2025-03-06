package com.rapiddocs.java.client.generators.endpoint;

import com.rapiddocs.ir.model.http.HttpEndpoint;
import com.rapiddocs.ir.model.http.HttpService;
import com.rapiddocs.ir.model.http.SdkRequest;
import com.rapiddocs.java.client.ClientGeneratorContext;
import com.rapiddocs.java.generators.object.EnrichedObjectProperty;
import com.squareup.javapoet.ParameterSpec;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

public class NoRequestEndpointWriterVariableNameContext extends AbstractEndpointWriterVariableNameContext {
    public NoRequestEndpointWriterVariableNameContext(
            ClientGeneratorContext clientGeneratorContext, HttpService httpService, HttpEndpoint httpEndpoint) {
        super(clientGeneratorContext, httpService, httpEndpoint);
        initializeCollections();
    }

    @Override
    public Optional<SdkRequest> sdkRequest() {
        return Optional.empty();
    }

    @Override
    public List<EnrichedObjectProperty> getQueryParams() {
        return Collections.emptyList();
    }

    @Override
    public List<ParameterSpec> additionalParameters() {
        return Collections.emptyList();
    }

    @Override
    public Optional<ParameterSpec> requestParameterSpec() {
        return Optional.empty();
    }
}
