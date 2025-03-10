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

import com.rapiddocs.java.client.ClientGeneratorContext;
import com.rapiddocs.java.generators.AbstractFileGenerator;
import com.rapiddocs.java.output.GeneratedResourcesJavaFile;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public final class ResponseBodyReaderGenerator extends AbstractFileGenerator {

    public ResponseBodyReaderGenerator(ClientGeneratorContext clientGeneratorContext) {
        super(
                clientGeneratorContext.getPoetClassNameFactory().getResponseBodyReaderClassName(),
                clientGeneratorContext);
    }

    @Override
    public GeneratedResourcesJavaFile generateFile() {
        try (InputStream is = ResponseBodyReaderGenerator.class.getResourceAsStream("/ResponseBodyReader.java")) {
            String contents = new String(is.readAllBytes(), StandardCharsets.UTF_8);
            return GeneratedResourcesJavaFile.builder()
                    .className(className)
                    .contents(contents)
                    .build();
        } catch (IOException e) {
            throw new RuntimeException("Failed to read ResponseBodyInputStream.java");
        }
    }
}
