/**
 * This file was auto-generated by Rapiddocs from our API Definition.
 */

package resources.payment.requests;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import core.ObjectMappers;
import java.lang.Object;
import java.lang.String;
import java.util.Objects;
import org.jetbrains.annotations.NotNull;
import resources.payment.types.Currency;

@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(
    builder = CreatePaymentRequest.Builder.class
)
public final class CreatePaymentRequest {
  private final int amount;

  private final Currency currency;

  private CreatePaymentRequest(int amount, Currency currency) {
    this.amount = amount;
    this.currency = currency;
  }

  @JsonProperty("amount")
  public int getAmount() {
    return amount;
  }

  @JsonProperty("currency")
  public Currency getCurrency() {
    return currency;
  }

  @java.lang.Override
  public boolean equals(Object other) {
    if (this == other) return true;
    return other instanceof CreatePaymentRequest && equalTo((CreatePaymentRequest) other);
  }

  private boolean equalTo(CreatePaymentRequest other) {
    return amount == other.amount && currency.equals(other.currency);
  }

  @java.lang.Override
  public int hashCode() {
    return Objects.hash(this.amount, this.currency);
  }

  @java.lang.Override
  public String toString() {
    return ObjectMappers.stringify(this);
  }

  public static AmountStage builder() {
    return new Builder();
  }

  public interface AmountStage {
    CurrencyStage amount(int amount);

    Builder from(CreatePaymentRequest other);
  }

  public interface CurrencyStage {
    _FinalStage currency(@NotNull Currency currency);
  }

  public interface _FinalStage {
    CreatePaymentRequest build();
  }

  @JsonIgnoreProperties(
      ignoreUnknown = true
  )
  public static final class Builder implements AmountStage, CurrencyStage, _FinalStage {
    private int amount;

    private Currency currency;

    private Builder() {
    }

    @java.lang.Override
    public Builder from(CreatePaymentRequest other) {
      amount(other.getAmount());
      currency(other.getCurrency());
      return this;
    }

    @java.lang.Override
    @JsonSetter("amount")
    public CurrencyStage amount(int amount) {
      this.amount = amount;
      return this;
    }

    @java.lang.Override
    @JsonSetter("currency")
    public _FinalStage currency(@NotNull Currency currency) {
      this.currency = Objects.requireNonNull(currency, "currency must not be null");
      return this;
    }

    @java.lang.Override
    public CreatePaymentRequest build() {
      return new CreatePaymentRequest(amount, currency);
    }
  }
}
