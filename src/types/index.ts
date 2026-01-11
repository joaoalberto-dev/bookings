import { type } from "arktype";

export const currency = type("'USD' | 'BRL'");
export type Currency = typeof currency.infer;
