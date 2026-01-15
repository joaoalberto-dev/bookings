import { toCurrency } from "./to-currency";

describe("toCurrency", () => {
  test.each([
    [100, "$1.00"],
    [150, "$1.50"],
    [1000, "$10.00"],
    [10000, "$100.00"],
    [12345, "$123.45"],
  ])("should convert %i correctly to %s", (value, converted) => {
    expect(toCurrency(value)).toBe(converted);
  });

  test("should throw if currency is wrong", () => {
    // @ts-expect-error -- Tests only
    expect(() => toCurrency(100, "ABC")).toThrow('must be "BRL" or "USD" (was "ABC")');
  });

  test("should throw if value is wrong", () => {
    // @ts-expect-error -- Tests only
    expect(() => toCurrency("ABC")).toThrow("must be a number (was a string)");
  });
});
