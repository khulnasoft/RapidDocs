/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
package com.seed.api.model;

import java.util.List;

public interface IBaseResource {
    String getId();

    List<ResourceList> getRelatedResources();

    Memo getMemo();
}
