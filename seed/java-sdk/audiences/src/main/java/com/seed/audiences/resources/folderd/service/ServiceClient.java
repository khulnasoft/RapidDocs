/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
package com.seed.audiences.resources.folderd.service;

import com.seed.audiences.core.ClientOptions;
import com.seed.audiences.core.ObjectMappers;
import com.seed.audiences.core.RequestOptions;
import com.seed.audiences.core.SeedAudiencesApiException;
import com.seed.audiences.core.SeedAudiencesException;
import com.seed.audiences.resources.folderd.service.types.Response;
import java.io.IOException;
import okhttp3.Headers;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.ResponseBody;

public class ServiceClient {
    protected final ClientOptions clientOptions;

    public ServiceClient(ClientOptions clientOptions) {
        this.clientOptions = clientOptions;
    }

    public Response getDirectThread() {
        return getDirectThread(null);
    }

    public Response getDirectThread(RequestOptions requestOptions) {
        HttpUrl httpUrl = HttpUrl.parse(this.clientOptions.environment().getUrl())
                .newBuilder()
                .addPathSegments("partner-path")
                .build();
        Request okhttpRequest = new Request.Builder()
                .url(httpUrl)
                .method("GET", null)
                .headers(Headers.of(clientOptions.headers(requestOptions)))
                .addHeader("Content-Type", "application/json")
                .addHeader("Accept", "application/json")
                .build();
        OkHttpClient client = clientOptions.httpClient();
        if (requestOptions != null && requestOptions.getTimeout().isPresent()) {
            client = clientOptions.httpClientWithTimeout(requestOptions);
        }
        try (okhttp3.Response response = client.newCall(okhttpRequest).execute()) {
            ResponseBody responseBody = response.body();
            if (response.isSuccessful()) {
                return ObjectMappers.JSON_MAPPER.readValue(responseBody.string(), Response.class);
            }
            String responseBodyString = responseBody != null ? responseBody.string() : "{}";
            throw new SeedAudiencesApiException(
                    "Error with status code " + response.code(),
                    response.code(),
                    ObjectMappers.JSON_MAPPER.readValue(responseBodyString, Object.class));
        } catch (IOException e) {
            throw new SeedAudiencesException("Network error executing HTTP request", e);
        }
    }
}
