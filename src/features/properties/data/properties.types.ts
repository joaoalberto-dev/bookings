import { type } from "arktype";

import { currency, location } from "@/types";

export const property = type({
  id: "string.uuid",
  name: "string",
  description: "string",
  cover: "string",
  day_price: "number.integer>0",
  currency: currency,
  location: location,
});

export const propertyResponse = type({
  properties: property.array(),
});

export type Property = typeof property.infer;
