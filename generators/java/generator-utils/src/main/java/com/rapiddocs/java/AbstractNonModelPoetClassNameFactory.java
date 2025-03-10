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

package com.rapiddocs.java;

import com.rapiddocs.ir.model.commons.RapiddocsFilepath;
import com.rapiddocs.ir.model.commons.Name;
import com.rapiddocs.ir.model.commons.SafeAndUnsafeString;
import com.rapiddocs.ir.model.types.DeclaredTypeName;
import com.squareup.javapoet.ClassName;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public abstract class AbstractNonModelPoetClassNameFactory extends AbstractPoetClassNameFactory {

    private static final Pattern STARTS_WITH_NUMBER = Pattern.compile("^\\d");

    public AbstractNonModelPoetClassNameFactory(
            List<String> packagePrefixTokens, ICustomConfig.PackageLayout packageLayout) {
        super(packagePrefixTokens, packageLayout);
    }

    @Override
    public final ClassName getTypeClassName(DeclaredTypeName declaredTypeName) {
        String packageName = getTypesPackageName(declaredTypeName.getRapiddocsFilepath());
        return ClassName.get(
                packageName, declaredTypeName.getName().getPascalCase().getSafeName());
    }

    @Override
    public final ClassName getInterfaceClassName(DeclaredTypeName declaredTypeName) {
        String packageName = getTypesPackageName(declaredTypeName.getRapiddocsFilepath());
        return ClassName.get(
                packageName, "I" + declaredTypeName.getName().getPascalCase().getSafeName());
    }

    protected final String getTypesPackageName(RapiddocsFilepath rapiddocsFilepath) {
        return getResourcesPackage(Optional.of(rapiddocsFilepath), Optional.of("types"));
    }

    protected final String getErrorsPackageName(RapiddocsFilepath rapiddocsFilepath) {
        return getResourcesPackage(Optional.of(rapiddocsFilepath), Optional.of("errors"));
    }

    protected final String getResourcesPackage(Optional<RapiddocsFilepath> rapiddocsFilepath, Optional<String> suffix) {
        List<String> tokens = new ArrayList<>(getPackagePrefixTokens());
        switch (packageLayout) {
            case FLAT:
                rapiddocsFilepath.ifPresent(filePath -> tokens.addAll(filePath.getPackagePath().stream()
                        .map(Name::getCamelCase)
                        .map(SafeAndUnsafeString::getSafeName)
                        .map(String::toLowerCase)
                        .collect(Collectors.toList())));
                break;
            case NESTED:
            default:
                if (rapiddocsFilepath.isPresent()
                        && !rapiddocsFilepath.get().getAllParts().isEmpty()) {
                    tokens.add("resources");
                }
                rapiddocsFilepath.ifPresent(filepath -> tokens.addAll(filepath.getAllParts().stream()
                        .map(Name::getCamelCase)
                        .map(SafeAndUnsafeString::getSafeName)
                        // names should be lower case
                        .map(String::toLowerCase)
                        .collect(Collectors.toList())));
        }

        suffix.ifPresent(tokens::add);
        List<String> sanitizedTokens = new ArrayList<>();
        for (String token : tokens) {
            if (startsWithNumber(token)) {
                sanitizedTokens.add("_" + token);
            } else {
                sanitizedTokens.add(token);
            }
        }
        return String.join(".", sanitizedTokens);
    }

    private static boolean startsWithNumber(String str) {
        return STARTS_WITH_NUMBER.matcher(str).find();
    }
}
