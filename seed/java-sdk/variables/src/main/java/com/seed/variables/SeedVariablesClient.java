/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
package com.seed.variables;

import com.seed.variables.core.ClientOptions;
import com.seed.variables.core.Suppliers;
import com.seed.variables.resources.service.ServiceClient;
import java.util.function.Supplier;

public class SeedVariablesClient {
    protected final ClientOptions clientOptions;

    protected final Supplier<ServiceClient> serviceClient;

    public SeedVariablesClient(ClientOptions clientOptions) {
        this.clientOptions = clientOptions;
        this.serviceClient = Suppliers.memoize(() -> new ServiceClient(clientOptions));
    }

    public ServiceClient service() {
        return this.serviceClient.get();
    }

    public static SeedVariablesClientBuilder builder() {
        return new SeedVariablesClientBuilder();
    }
}
