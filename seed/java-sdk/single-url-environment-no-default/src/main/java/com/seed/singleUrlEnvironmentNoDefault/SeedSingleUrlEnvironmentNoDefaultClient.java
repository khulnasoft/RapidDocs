/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
package com.seed.singleUrlEnvironmentNoDefault;

import com.seed.singleUrlEnvironmentNoDefault.core.ClientOptions;
import com.seed.singleUrlEnvironmentNoDefault.core.Suppliers;
import com.seed.singleUrlEnvironmentNoDefault.resources.dummy.DummyClient;
import java.util.function.Supplier;

public class SeedSingleUrlEnvironmentNoDefaultClient {
    protected final ClientOptions clientOptions;

    protected final Supplier<DummyClient> dummyClient;

    public SeedSingleUrlEnvironmentNoDefaultClient(ClientOptions clientOptions) {
        this.clientOptions = clientOptions;
        this.dummyClient = Suppliers.memoize(() -> new DummyClient(clientOptions));
    }

    public DummyClient dummy() {
        return this.dummyClient.get();
    }

    public static SeedSingleUrlEnvironmentNoDefaultClientBuilder builder() {
        return new SeedSingleUrlEnvironmentNoDefaultClientBuilder();
    }
}
