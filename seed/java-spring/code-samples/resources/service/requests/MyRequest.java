/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

package resources.service.requests;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import core.ObjectMappers;
import java.lang.Object;
import java.lang.String;
import java.util.Objects;

@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(
    builder = MyRequest.Builder.class
)
public final class MyRequest {
  private final int numEvents;

  private MyRequest(int numEvents) {
    this.numEvents = numEvents;
  }

  @JsonProperty("num_events")
  public int getNumEvents() {
    return numEvents;
  }

  @java.lang.Override
  public boolean equals(Object other) {
    if (this == other) return true;
    return other instanceof MyRequest && equalTo((MyRequest) other);
  }

  private boolean equalTo(MyRequest other) {
    return numEvents == other.numEvents;
  }

  @java.lang.Override
  public int hashCode() {
    return Objects.hash(this.numEvents);
  }

  @java.lang.Override
  public String toString() {
    return ObjectMappers.stringify(this);
  }

  public static NumEventsStage builder() {
    return new Builder();
  }

  public interface NumEventsStage {
    _FinalStage numEvents(int numEvents);

    Builder from(MyRequest other);
  }

  public interface _FinalStage {
    MyRequest build();
  }

  @JsonIgnoreProperties(
      ignoreUnknown = true
  )
  public static final class Builder implements NumEventsStage, _FinalStage {
    private int numEvents;

    private Builder() {
    }

    @java.lang.Override
    public Builder from(MyRequest other) {
      numEvents(other.getNumEvents());
      return this;
    }

    @java.lang.Override
    @JsonSetter("num_events")
    public _FinalStage numEvents(int numEvents) {
      this.numEvents = numEvents;
      return this;
    }

    @java.lang.Override
    public MyRequest build() {
      return new MyRequest(numEvents);
    }
  }
}
