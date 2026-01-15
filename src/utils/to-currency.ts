import { type } from "arktype";

import type { Currency } from "@/types";
import { currency as currencyType } from "@/types";

export const toCurrency = (cents: number, currency: Currency = "USD") => {
  const validatedCurrency = currencyType(currency);
  const validatedValue = type("number.integer>0")(cents);

  if (validatedCurrency instanceof type.errors) {
    throw new Error(validatedCurrency.summary);
  }

  if (validatedValue instanceof type.errors) {
    throw new Error(validatedValue.summary);
  }

  const ammount = validatedValue / 100;
  const formatter = Intl.NumberFormat("en-US", { style: "currency", currency: validatedCurrency });

  return formatter.format(ammount);
};
