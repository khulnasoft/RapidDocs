package com.rapiddocs.java.client.generators.visitors;

import com.rapiddocs.ir.model.commons.NameAndWireValue;
import com.rapiddocs.ir.model.http.QueryParameter;
import com.rapiddocs.ir.model.http.RequestPropertyValue;
import com.rapiddocs.ir.model.types.ObjectProperty;

public class RequestPropertyToNameVisitor implements RequestPropertyValue.Visitor<NameAndWireValue> {

    @Override
    public NameAndWireValue visitQuery(QueryParameter query) {
        return query.getName();
    }

    @Override
    public NameAndWireValue visitBody(ObjectProperty body) {
        return body.getName();
    }

    @Override
    public NameAndWireValue _visitUnknown(Object unknownType) {
        throw new RuntimeException("Unknown NameAndWireValue type: " + unknownType);
    }
}
