package com.rapiddocs.java.client.generators.endpoint;

import com.squareup.javapoet.MethodSpec;

public class SyncHttpEndpointMethodSpecsFactory implements HttpEndpointMethodSpecsFactory {
    @Override
    public HttpEndpointMethodSpecs create(
            MethodSpec requestOptionsMethodSpec,
            MethodSpec nonRequestOptionsMethodSpec,
            MethodSpec noRequestBodyMethodSpec,
            MethodSpec byteArrayMethodSpec,
            MethodSpec nonRequestOptionsByteArrayMethodSpec) {
        return new HttpEndpointMethodSpecs(
                requestOptionsMethodSpec,
                nonRequestOptionsMethodSpec,
                noRequestBodyMethodSpec,
                byteArrayMethodSpec,
                nonRequestOptionsByteArrayMethodSpec);
    }
}
