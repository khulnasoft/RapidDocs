/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
package com.seed.object;

import com.seed.object.core.ClientOptions;

public class AsyncSeedObjectClient {
    protected final ClientOptions clientOptions;

    public AsyncSeedObjectClient(ClientOptions clientOptions) {
        this.clientOptions = clientOptions;
    }

    public static SeedObjectClientBuilder builder() {
        return new SeedObjectClientBuilder();
    }
}
