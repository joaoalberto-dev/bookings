import { type Booking } from "./booking.types";
import { calculateNights, calculateTotalPrice, isOverlaping, validateDates } from "./booking.validation";

describe("validateDates", () => {
  test("should return null for valid dates", () => {
    expect(validateDates("2026-01-01", "2026-01-02")).toBeNull();
  });

  test("should return error when end date is before start date", () => {
    expect(validateDates("2026-01-02", "2026-01-01")).toBe("End date must be after start date");
  });

  test("should return error when start date is invalid", () => {
    expect(validateDates("invalid", "2026-01-01")).toBe("Invalid start date");
  });

  test("should return error when end date is invalid", () => {
    expect(validateDates("2026-01-01", "invalid")).toBe("Invalid end date");
  });
});

describe("calculateNights", () => {
  test("should throw when start date is after end date", () => {
    expect(() => calculateNights("2026-01-02", "2026-01-01")).toThrow("End date must be after start date");
  });

  test("should throw when dates are equal", () => {
    expect(() => calculateNights("2026-01-01", "2026-01-01")).toThrow("End date must be after start date");
  });

  test("should return correct night count", () => {
    expect(calculateNights("2026-01-01", "2026-01-10")).toBe(9);
  });
});

describe("calculateTotalPrice", () => {
  test("should throw when start date is after end date", () => {
    expect(() => calculateTotalPrice("2026-01-02", "2026-01-01", 100)).toThrow("End date must be after start date");
  });

  test("should return correct total price", () => {
    expect(calculateTotalPrice("2026-01-01", "2026-01-10", 100)).toBe(900);
  });
});

describe("isOverlaping", () => {
  test("should return true when candidate overlaps existing booking", () => {
    expect(isOverlaping(mockBookings, createCandidate("2026-01-02", "2026-01-05"))).toBe(true);
  });

  test("should return true when candidate encompasses existing booking", () => {
    expect(isOverlaping(mockBookings, createCandidate("2026-01-05", "2026-01-20"))).toBe(true);
  });

  test("should return false when no overlap", () => {
    expect(isOverlaping(mockBookings, createCandidate("2026-01-04", "2026-01-07"))).toBe(false);
  });

  test("should throw for invalid candidate dates", () => {
    expect(() => isOverlaping(mockBookings, createCandidate("invalid", "2026-01-05"))).toThrow("Invalid start date");
  });

  test("should throw when candidate start is after end", () => {
    expect(() => isOverlaping(mockBookings, createCandidate("2026-01-06", "2026-01-05"))).toThrow(
      "End date must be after start date",
    );
  });
});

const mockBookings: Booking[] = [
  {
    id: "aba5b1d4-73b2-4bab-a68a-8915e7d84713",
    user_id: "c9adc9d8-7511-4f9b-829a-0e638d8bd441",
    property_id: "4c6123ed-0069-4f71-b400-b6ade74de47b",
    start_date: "2026-01-01",
    end_date: "2026-01-04",
    day_price: 1000,
    total_price: 3000,
    currency: "USD",
  },
  {
    id: "aba5b1d4-73b2-4bab-a68a-8915e7d84714",
    user_id: "c9adc9d8-7511-4f9b-829a-0e638d8bd442",
    property_id: "4c6123ed-0069-4f71-b400-b6ade74de47c",
    start_date: "2026-01-07",
    end_date: "2026-01-13",
    day_price: 1000,
    total_price: 6000,
    currency: "USD",
  },
];

const createCandidate = (start: string, end: string): Booking => ({
  id: "test-id",
  user_id: "test-user",
  property_id: "test-property",
  start_date: start,
  end_date: end,
  day_price: 1000,
  total_price: 1000,
  currency: "USD",
});
