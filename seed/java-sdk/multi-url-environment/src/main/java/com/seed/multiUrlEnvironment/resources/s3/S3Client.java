/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
package com.seed.multiUrlEnvironment.resources.s3;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.seed.multiUrlEnvironment.core.ClientOptions;
import com.seed.multiUrlEnvironment.core.MediaTypes;
import com.seed.multiUrlEnvironment.core.ObjectMappers;
import com.seed.multiUrlEnvironment.core.RequestOptions;
import com.seed.multiUrlEnvironment.core.SeedMultiUrlEnvironmentApiException;
import com.seed.multiUrlEnvironment.core.SeedMultiUrlEnvironmentException;
import com.seed.multiUrlEnvironment.resources.s3.requests.GetPresignedUrlRequest;
import java.io.IOException;
import okhttp3.Headers;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.ResponseBody;

public class S3Client {
    protected final ClientOptions clientOptions;

    public S3Client(ClientOptions clientOptions) {
        this.clientOptions = clientOptions;
    }

    public String getPresignedUrl(GetPresignedUrlRequest request) {
        return getPresignedUrl(request, null);
    }

    public String getPresignedUrl(GetPresignedUrlRequest request, RequestOptions requestOptions) {
        HttpUrl httpUrl = HttpUrl.parse(this.clientOptions.environment().getS3URL())
                .newBuilder()
                .addPathSegments("s3")
                .addPathSegments("presigned-url")
                .build();
        RequestBody body;
        try {
            body = RequestBody.create(
                    ObjectMappers.JSON_MAPPER.writeValueAsBytes(request), MediaTypes.APPLICATION_JSON);
        } catch (JsonProcessingException e) {
            throw new SeedMultiUrlEnvironmentException("Failed to serialize request", e);
        }
        Request okhttpRequest = new Request.Builder()
                .url(httpUrl)
                .method("POST", body)
                .headers(Headers.of(clientOptions.headers(requestOptions)))
                .addHeader("Content-Type", "application/json")
                .addHeader("Accept", "application/json")
                .build();
        OkHttpClient client = clientOptions.httpClient();
        if (requestOptions != null && requestOptions.getTimeout().isPresent()) {
            client = clientOptions.httpClientWithTimeout(requestOptions);
        }
        try (Response response = client.newCall(okhttpRequest).execute()) {
            ResponseBody responseBody = response.body();
            if (response.isSuccessful()) {
                return ObjectMappers.JSON_MAPPER.readValue(responseBody.string(), String.class);
            }
            String responseBodyString = responseBody != null ? responseBody.string() : "{}";
            throw new SeedMultiUrlEnvironmentApiException(
                    "Error with status code " + response.code(),
                    response.code(),
                    ObjectMappers.JSON_MAPPER.readValue(responseBodyString, Object.class));
        } catch (IOException e) {
            throw new SeedMultiUrlEnvironmentException("Network error executing HTTP request", e);
        }
    }
}
