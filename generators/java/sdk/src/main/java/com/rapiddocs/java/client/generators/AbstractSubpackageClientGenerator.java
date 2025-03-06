/*
 * (c) Copyright 2023 Birch Solutions Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.rapiddocs.java.client.generators;

import com.rapiddocs.ir.model.commons.ErrorId;
import com.rapiddocs.ir.model.commons.TypeId;
import com.rapiddocs.ir.model.ir.Subpackage;
import com.rapiddocs.java.AbstractGeneratorContext;
import com.rapiddocs.java.client.ClientGeneratorContext;
import com.rapiddocs.java.client.GeneratedClient;
import com.rapiddocs.java.client.GeneratedClientOptions;
import com.rapiddocs.java.client.GeneratedEnvironmentsClass;
import com.rapiddocs.java.client.generators.AbstractClientGeneratorUtils.Result;
import com.rapiddocs.java.generators.AbstractFileGenerator;
import com.rapiddocs.java.output.GeneratedJavaFile;
import com.rapiddocs.java.output.GeneratedJavaInterface;
import com.rapiddocs.java.output.GeneratedObjectMapper;
import com.squareup.javapoet.JavaFile;
import java.util.Map;

public abstract class AbstractSubpackageClientGenerator extends AbstractFileGenerator {
    protected final GeneratedObjectMapper generatedObjectMapper;
    protected final ClientGeneratorContext clientGeneratorContext;
    protected final GeneratedClientOptions generatedClientOptions;
    protected final Map<TypeId, GeneratedJavaInterface> allGeneratedInterfaces;
    protected final GeneratedJavaFile generatedSuppliersFile;
    protected final GeneratedEnvironmentsClass generatedEnvironmentsClass;
    protected final Subpackage subpackage;
    protected final GeneratedJavaFile requestOptionsFile;
    protected final Map<ErrorId, GeneratedJavaFile> generatedErrors;

    public AbstractSubpackageClientGenerator(
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
        super(clientGeneratorContext.getPoetClassNameFactory().getClientClassName(subpackage), generatorContext);
        this.generatedObjectMapper = generatedObjectMapper;
        this.clientGeneratorContext = clientGeneratorContext;
        this.generatedClientOptions = generatedClientOptions;
        this.generatedSuppliersFile = generatedSuppliersFile;
        this.allGeneratedInterfaces = allGeneratedInterfaces;
        this.generatedEnvironmentsClass = generatedEnvironmentsClass;
        this.requestOptionsFile = requestOptionsFile;
        this.subpackage = subpackage;
        this.generatedErrors = generatedErrors;
    }

    protected abstract AbstractClientGeneratorUtils clientGeneratorUtils();

    @Override
    public GeneratedClient generateFile() {
        AbstractClientGeneratorUtils abstractClientGeneratorUtils = clientGeneratorUtils();
        Result result = abstractClientGeneratorUtils.buildClients();
        return GeneratedClient.builder()
                .className(className)
                .javaFile(JavaFile.builder(
                                className.packageName(), result.getClientImpl().build())
                        .build())
                .addAllWrappedRequests(result.getGeneratedWrappedRequests())
                .build();
    }
}
