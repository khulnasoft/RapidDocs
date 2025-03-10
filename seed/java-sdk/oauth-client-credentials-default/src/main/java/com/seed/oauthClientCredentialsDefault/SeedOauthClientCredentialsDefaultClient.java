/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
package com.seed.oauthClientCredentialsDefault;

import com.seed.oauthClientCredentialsDefault.core.ClientOptions;
import com.seed.oauthClientCredentialsDefault.core.Suppliers;
import com.seed.oauthClientCredentialsDefault.resources.auth.AuthClient;
import java.util.function.Supplier;

public class SeedOauthClientCredentialsDefaultClient {
    protected final ClientOptions clientOptions;

    protected final Supplier<AuthClient> authClient;

    public SeedOauthClientCredentialsDefaultClient(ClientOptions clientOptions) {
        this.clientOptions = clientOptions;
        this.authClient = Suppliers.memoize(() -> new AuthClient(clientOptions));
    }

    public AuthClient auth() {
        return this.authClient.get();
    }

    public static SeedOauthClientCredentialsDefaultClientBuilder builder() {
        return new SeedOauthClientCredentialsDefaultClientBuilder();
    }
}
