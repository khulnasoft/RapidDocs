/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
package com.seed.errorProperty;

import com.seed.errorProperty.core.ClientOptions;
import com.seed.errorProperty.core.Environment;
import okhttp3.OkHttpClient;

public final class SeedErrorPropertyClientBuilder {
    private ClientOptions.Builder clientOptionsBuilder = ClientOptions.builder();

    private Environment environment;

    public SeedErrorPropertyClientBuilder url(String url) {
        this.environment = Environment.custom(url);
        return this;
    }

    /**
     * Sets the timeout (in seconds) for the client
     */
    public SeedErrorPropertyClientBuilder timeout(int timeout) {
        this.clientOptionsBuilder.timeout(timeout);
        return this;
    }

    /**
     * Sets the underlying OkHttp client
     */
    public SeedErrorPropertyClientBuilder httpClient(OkHttpClient httpClient) {
        this.clientOptionsBuilder.httpClient(httpClient);
        return this;
    }

    public SeedErrorPropertyClient build() {
        clientOptionsBuilder.environment(this.environment);
        return new SeedErrorPropertyClient(clientOptionsBuilder.build());
    }
}
