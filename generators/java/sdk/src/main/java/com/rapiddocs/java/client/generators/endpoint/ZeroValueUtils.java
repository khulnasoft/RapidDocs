package com.rapiddocs.java.client.generators.endpoint;

import com.rapiddocs.ir.model.types.Base64Type;
import com.rapiddocs.ir.model.types.BigIntegerType;
import com.rapiddocs.ir.model.types.BooleanType;
import com.rapiddocs.ir.model.types.DateTimeType;
import com.rapiddocs.ir.model.types.DateType;
import com.rapiddocs.ir.model.types.DoubleType;
import com.rapiddocs.ir.model.types.FloatType;
import com.rapiddocs.ir.model.types.IntegerType;
import com.rapiddocs.ir.model.types.LongType;
import com.rapiddocs.ir.model.types.PrimitiveType;
import com.rapiddocs.ir.model.types.PrimitiveTypeV1;
import com.rapiddocs.ir.model.types.PrimitiveTypeV2;
import com.rapiddocs.ir.model.types.StringType;
import com.rapiddocs.ir.model.types.Uint64Type;
import com.rapiddocs.ir.model.types.UintType;
import com.rapiddocs.ir.model.types.UuidType;
import com.squareup.javapoet.CodeBlock;
import java.math.BigInteger;
import java.util.Arrays;

public class ZeroValueUtils {

    public static CodeBlock isNonzeroValue(String variableName, PrimitiveType primitiveType) {
        if (primitiveType.getV2().isPresent()) {
            PrimitiveTypeV2 v2 = primitiveType.getV2().get();
            return v2.visit(new IsV2NonzeroValue(variableName));
        }

        PrimitiveTypeV1 v1 = primitiveType.getV1();
        return v1.visit(new IsV1NonzeroValue(variableName));
    }

    public static class IsV1NonzeroValue implements PrimitiveTypeV1.Visitor<CodeBlock> {

        private final String variableName;

        public IsV1NonzeroValue(String variableName) {
            this.variableName = variableName;
        }

        @Override
        public CodeBlock visitInteger() {
            return CodeBlock.of("$L != 0", variableName);
        }

        @Override
        public CodeBlock visitLong() {
            return CodeBlock.of("$L != 0L", variableName);
        }

        @Override
        public CodeBlock visitUint() {
            // TODO(ajgateno): Implement uints property in java generator
            return CodeBlock.of("$L != 0L", variableName);
        }

        @Override
        public CodeBlock visitUint64() {
            // TODO(ajgateno): Implement uints property in java generator
            return CodeBlock.of("$L != 0L", variableName);
        }

        @Override
        public CodeBlock visitFloat() {
            return CodeBlock.of("$L != 0.0", variableName);
        }

        @Override
        public CodeBlock visitDouble() {
            return CodeBlock.of("$L != 0.0", variableName);
        }

        @Override
        public CodeBlock visitBoolean() {
            return CodeBlock.of("$L", variableName);
        }

        @Override
        public CodeBlock visitString() {
            return CodeBlock.of("!$L.isEmpty()", variableName);
        }

        @Override
        public CodeBlock visitDate() {
            // TODO(ajgateno): Maybe come back and test to make sure this is the right zero value
            return CodeBlock.of("!$L.isEmpty()", variableName);
        }

        @Override
        public CodeBlock visitDateTime() {
            // TODO(ajgateno): Maybe come back and test to make sure this is the right zero value
            return CodeBlock.of("!$L.isEmpty()", variableName);
        }

        @Override
        public CodeBlock visitUuid() {
            // TODO(ajgateno): Maybe come back and test to make sure this is the right zero value
            return CodeBlock.of("!$L.isEmpty()", variableName);
        }

        @Override
        public CodeBlock visitBase64() {
            // TODO(ajgateno): Maybe come back and test to make sure this is the right zero value
            return CodeBlock.of("$T.equals($L, new byte[0])", Arrays.class, variableName);
        }

        @Override
        public CodeBlock visitBigInteger() {
            return CodeBlock.of("$L.equals($T.ZERO)", variableName, BigInteger.class);
        }

        @Override
        public CodeBlock visitUnknown(String s) {
            throw new IllegalArgumentException("Received unknown primitive type: " + s);
        }
    }

    public static class IsV2NonzeroValue implements PrimitiveTypeV2.Visitor<CodeBlock> {

        private final String variableName;

        public IsV2NonzeroValue(String variableName) {
            this.variableName = variableName;
        }

        @Override
        public CodeBlock visitInteger(IntegerType integerType) {
            return CodeBlock.of("$L != 0", variableName);
        }

        @Override
        public CodeBlock visitLong(LongType longType) {
            return CodeBlock.of("$L != 0L", variableName);
        }

        @Override
        public CodeBlock visitUint(UintType uintType) {
            // TODO(ajgateno): Implement uints property in java generator
            return CodeBlock.of("$L != 0L", variableName);
        }

        @Override
        public CodeBlock visitUint64(Uint64Type uint64Type) {
            // TODO(ajgateno): Implement uints property in java generator
            return CodeBlock.of("$L != 0L", variableName);
        }

        @Override
        public CodeBlock visitFloat(FloatType floatType) {
            return CodeBlock.of("$L != 0.0", variableName);
        }

        @Override
        public CodeBlock visitDouble(DoubleType doubleType) {
            return CodeBlock.of("$L != 0.0", variableName);
        }

        @Override
        public CodeBlock visitBoolean(BooleanType booleanType) {
            return CodeBlock.of("$L", variableName);
        }

        @Override
        public CodeBlock visitString(StringType stringType) {
            return CodeBlock.of("!$L.isEmpty()", variableName);
        }

        @Override
        public CodeBlock visitDate(DateType dateType) {
            // TODO(ajgateno): Maybe come back and test to make sure this is the right zero value
            return CodeBlock.of("!$L.isEmpty()", variableName);
        }

        @Override
        public CodeBlock visitDateTime(DateTimeType dateTimeType) {
            // TODO(ajgateno): Maybe come back and test to make sure this is the right zero value
            return CodeBlock.of("!$L.isEmpty()", variableName);
        }

        @Override
        public CodeBlock visitUuid(UuidType uuidType) {
            // TODO(ajgateno): Maybe come back and test to make sure this is the right zero value
            return CodeBlock.of("!$L.isEmpty()", variableName);
        }

        @Override
        public CodeBlock visitBase64(Base64Type base64Type) {
            // TODO(ajgateno): Maybe come back and test to make sure this is the right zero value
            return CodeBlock.of("$T.equals($L, new byte[0])", Arrays.class, variableName);
        }

        @Override
        public CodeBlock visitBigInteger(BigIntegerType bigIntegerType) {
            return CodeBlock.of("$L.equals($T.ZERO)", variableName, BigInteger.class);
        }

        @Override
        public CodeBlock _visitUnknown(Object o) {
            throw new IllegalArgumentException("Received unknown primitive type: " + o);
        }
    }
}
