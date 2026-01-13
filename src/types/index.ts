import { type } from "arktype";

export const currency = type("'USD' | 'BRL'");
export type Currency = typeof currency.infer;

export const location = type({
  city: "string",
  country: "string",
});
export type Location = typeof location.infer;
