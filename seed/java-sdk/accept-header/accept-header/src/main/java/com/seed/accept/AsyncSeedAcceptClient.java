/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
package com.seed.accept;

import com.seed.accept.core.ClientOptions;
import com.seed.accept.core.Suppliers;
import com.seed.accept.resources.service.AsyncServiceClient;
import java.util.function.Supplier;

public class AsyncSeedAcceptClient {
    protected final ClientOptions clientOptions;

    protected final Supplier<AsyncServiceClient> serviceClient;

    public AsyncSeedAcceptClient(ClientOptions clientOptions) {
        this.clientOptions = clientOptions;
        this.serviceClient = Suppliers.memoize(() -> new AsyncServiceClient(clientOptions));
    }

    public AsyncServiceClient service() {
        return this.serviceClient.get();
    }

    public static SeedAcceptClientBuilder builder() {
        return new SeedAcceptClientBuilder();
    }
}
