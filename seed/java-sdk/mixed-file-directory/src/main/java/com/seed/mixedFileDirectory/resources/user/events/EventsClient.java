/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */
package com.seed.mixedFileDirectory.resources.user.events;

import com.fasterxml.jackson.core.type.TypeReference;
import com.seed.mixedFileDirectory.core.ClientOptions;
import com.seed.mixedFileDirectory.core.ObjectMappers;
import com.seed.mixedFileDirectory.core.QueryStringMapper;
import com.seed.mixedFileDirectory.core.RequestOptions;
import com.seed.mixedFileDirectory.core.SeedMixedFileDirectoryApiException;
import com.seed.mixedFileDirectory.core.SeedMixedFileDirectoryException;
import com.seed.mixedFileDirectory.core.Suppliers;
import com.seed.mixedFileDirectory.resources.user.events.metadata.MetadataClient;
import com.seed.mixedFileDirectory.resources.user.events.requests.ListUserEventsRequest;
import com.seed.mixedFileDirectory.resources.user.events.types.Event;
import java.io.IOException;
import java.util.List;
import java.util.function.Supplier;
import okhttp3.Headers;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;

public class EventsClient {
    protected final ClientOptions clientOptions;

    protected final Supplier<MetadataClient> metadataClient;

    public EventsClient(ClientOptions clientOptions) {
        this.clientOptions = clientOptions;
        this.metadataClient = Suppliers.memoize(() -> new MetadataClient(clientOptions));
    }

    /**
     * List all user events.
     */
    public List<Event> listEvents() {
        return listEvents(ListUserEventsRequest.builder().build());
    }

    /**
     * List all user events.
     */
    public List<Event> listEvents(ListUserEventsRequest request) {
        return listEvents(request, null);
    }

    /**
     * List all user events.
     */
    public List<Event> listEvents(ListUserEventsRequest request, RequestOptions requestOptions) {
        HttpUrl.Builder httpUrl = HttpUrl.parse(this.clientOptions.environment().getUrl())
                .newBuilder()
                .addPathSegments("users/events");
        if (request.getLimit().isPresent()) {
            QueryStringMapper.addQueryParameter(
                    httpUrl, "limit", request.getLimit().get().toString(), false);
        }
        Request.Builder _requestBuilder = new Request.Builder()
                .url(httpUrl.build())
                .method("GET", null)
                .headers(Headers.of(clientOptions.headers(requestOptions)))
                .addHeader("Content-Type", "application/json")
                .addHeader("Accept", "application/json");
        Request okhttpRequest = _requestBuilder.build();
        OkHttpClient client = clientOptions.httpClient();
        if (requestOptions != null && requestOptions.getTimeout().isPresent()) {
            client = clientOptions.httpClientWithTimeout(requestOptions);
        }
        try (Response response = client.newCall(okhttpRequest).execute()) {
            ResponseBody responseBody = response.body();
            if (response.isSuccessful()) {
                return ObjectMappers.JSON_MAPPER.readValue(responseBody.string(), new TypeReference<List<Event>>() {});
            }
            String responseBodyString = responseBody != null ? responseBody.string() : "{}";
            throw new SeedMixedFileDirectoryApiException(
                    "Error with status code " + response.code(),
                    response.code(),
                    ObjectMappers.JSON_MAPPER.readValue(responseBodyString, Object.class));
        } catch (IOException e) {
            throw new SeedMixedFileDirectoryException("Network error executing HTTP request", e);
        }
    }

    public MetadataClient metadata() {
        return this.metadataClient.get();
    }
}
