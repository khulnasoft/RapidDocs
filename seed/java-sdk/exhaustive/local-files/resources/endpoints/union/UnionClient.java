/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

package com.rapiddocs.sdk.resources.endpoints.union;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.rapiddocs.sdk.core.ClientOptions;
import com.rapiddocs.sdk.core.MediaTypes;
import com.rapiddocs.sdk.core.ObjectMappers;
import com.rapiddocs.sdk.core.RequestOptions;
import com.rapiddocs.sdk.core.SeedExhaustiveApiException;
import com.rapiddocs.sdk.core.SeedExhaustiveException;
import com.rapiddocs.sdk.resources.types.union.types.Animal;
import java.io.IOException;
import java.lang.Object;
import java.lang.String;
import okhttp3.Headers;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.ResponseBody;

public class UnionClient {
  protected final ClientOptions clientOptions;

  public UnionClient(ClientOptions clientOptions) {
    this.clientOptions = clientOptions;
  }

  public Animal getAndReturnUnion(Animal request) {
    return getAndReturnUnion(request,null);
  }

  public Animal getAndReturnUnion(Animal request, RequestOptions requestOptions) {
    HttpUrl httpUrl = HttpUrl.parse(this.clientOptions.environment().getUrl()).newBuilder()
      .addPathSegments("union")

      .build();
    RequestBody body;
    try {
      body = RequestBody.create(ObjectMappers.JSON_MAPPER.writeValueAsBytes(request), MediaTypes.APPLICATION_JSON);
    }
    catch(JsonProcessingException e) {
      throw new SeedExhaustiveException("Failed to serialize request", e);
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
        return ObjectMappers.JSON_MAPPER.readValue(responseBody.string(), Animal.class);
      }
      String responseBodyString = responseBody != null ? responseBody.string() : "{}";
      throw new SeedExhaustiveApiException("Error with status code " + response.code(), response.code(), ObjectMappers.JSON_MAPPER.readValue(responseBodyString, Object.class));
    }
    catch (IOException e) {
      throw new SeedExhaustiveException("Network error executing HTTP request", e);
    }
  }
}
