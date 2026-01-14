import { type Booking } from "./booking.types";
import { calculateNights, calculateTotalPrice, isOverlaping, validateDates } from "./booking.validation";

const tomorrow = () => {
  const today = new Date();
  return new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + 1));
};

describe("validateDates", () => {
  test("should return true if start date and end date are valid", () => {
    const start = new Date();
    const end = tomorrow();

    expect(validateDates(start, end)).toBe(true);
  });

  test("should return false when start date is bigger than end date", () => {
    expect(() => validateDates(new Date(2026, 1, 2), new Date(2026, 1, 1))).toThrow(
      "End date must be after start date",
    );
  });

  test("should throw 'Invalid start date' when start date is invalid", () => {
    // @ts-expect-error -- Tests only
    expect(() => validateDates(new Date("a", "b", "c"), new Date(2026, 1, 1))).toThrow("Invalid start date");
  });

  test("should throw 'Invalid end date' when end date is invalid", () => {
    // @ts-expect-error -- Tests only
    expect(() => validateDates(new Date(2026, 1, 1), new Date("d", "e", "f"))).toThrow("Invalid end date");
  });
});

describe("calculateNights", () => {
  test("should return false if start date is bigger than end date", () => {
    const start = new Date();
    const end = tomorrow();

    expect(() => calculateNights(end, start)).toThrow("End date must be after start date");
  });

  test("should return false if start date is equal to end date", () => {
    const start = new Date();
    const end = new Date();

    expect(() => calculateNights(start, end)).toThrow("End date must be after start date");
  });

  test("should return the count of nights if start date is smaller than end date", () => {
    const start = new Date(2026, 1, 1);
    const end = new Date(2026, 1, 10);

    expect(calculateNights(start, end)).toBe(9);
  });
});

describe("calculateTotalPrice", () => {
  test("should return false if start date is bigger than end date", () => {
    const start = new Date();
    const end = tomorrow();

    expect(() => calculateTotalPrice(end, start, 100)).toThrow("End date must be after start date");
  });

  test("should return the correct value when start date is smaller than end date", () => {
    const start = new Date(2026, 1, 1);
    const end = new Date(2026, 1, 10);

    expect(calculateTotalPrice(start, end, 100)).toBe(900);
  });
});

describe("isOverlaping", () => {
  test("should return 'true' when there is any overlap inside dates", () => {
    const candidateBooking: Booking = {
      id: "aba5b1d4-73b2-4bab-a68a-8915e7d84713",
      user_id: "c9adc9d8-7511-4f9b-829a-0e638d8bd441",
      property_id: "4c6123ed-0069-4f71-b400-b6ade74de47b",
      start_date: "2026-01-01T00:00:00.000Z",
      end_date: "2026-01-02T00:00:00.000Z",
      day_price: 1000,
      total_price: 9000,
      currency: "USD",
    };

    expect(isOverlaping(mockBookings, candidateBooking)).toBe(true);
  });

  test("should return 'true' when there is any candidate booking encompasses an existing booking", () => {
    const candidateBooking: Booking = {
      id: "aba5b1d4-73b2-4bab-a68a-8915e7d84713",
      user_id: "c9adc9d8-7511-4f9b-829a-0e638d8bd441",
      property_id: "4c6123ed-0069-4f71-b400-b6ade74de47b",
      start_date: "2026-01-05T00:00:00.000Z",
      end_date: "2026-01-20T00:00:00.000Z",
      day_price: 1000,
      total_price: 9000,
      currency: "USD",
    };

    expect(isOverlaping(mockBookings, candidateBooking)).toBe(true);
  });

  test("should return 'false' when there is no overlap", () => {
    const candidateBooking: Booking = {
      id: "aba5b1d4-73b2-4bab-a68a-8915e7d84713",
      user_id: "c9adc9d8-7511-4f9b-829a-0e638d8bd441",
      property_id: "4c6123ed-0069-4f71-b400-b6ade74de47b",
      start_date: "2026-01-04T00:00:00.000Z",
      end_date: "2026-01-05T00:00:00.000Z",
      day_price: 1000,
      total_price: 9000,
      currency: "USD",
    };

    expect(isOverlaping(mockBookings, candidateBooking)).toBe(false);
  });

  test("should throw when candidate booking has a invalid date", () => {
    const candidateBooking: Booking = {
      id: "aba5b1d4-73b2-4bab-a68a-8915e7d84713",
      user_id: "c9adc9d8-7511-4f9b-829a-0e638d8bd441",
      property_id: "4c6123ed-0069-4f71-b400-b6ade74de47b",
      start_date: "abcd-01-04T00:00:00.000Z",
      end_date: "2026-01-05T00:00:00.000Z",
      day_price: 1000,
      total_price: 9000,
      currency: "USD",
    };

    expect(() => isOverlaping(mockBookings, candidateBooking)).toThrow("Invalid start date");
  });

  test("should throw when candidate booking start date is bigger than end date", () => {
    const candidateBooking: Booking = {
      id: "aba5b1d4-73b2-4bab-a68a-8915e7d84713",
      user_id: "c9adc9d8-7511-4f9b-829a-0e638d8bd441",
      property_id: "4c6123ed-0069-4f71-b400-b6ade74de47b",
      start_date: "2026-01-06T00:00:00.000Z",
      end_date: "2026-01-05T00:00:00.000Z",
      day_price: 1000,
      total_price: 9000,
      currency: "USD",
    };

    expect(() => isOverlaping(mockBookings, candidateBooking)).toThrow("End date must be after start date");
  });
});

const mockBookings: Booking[] = [
  {
    id: "aba5b1d4-73b2-4bab-a68a-8915e7d84713",
    user_id: "c9adc9d8-7511-4f9b-829a-0e638d8bd441",
    property_id: "4c6123ed-0069-4f71-b400-b6ade74de47b",
    start_date: "2026-01-01T00:00:00.000Z",
    end_date: "2026-01-02T00:00:00.000Z",
    day_price: 1000,
    total_price: 9000,
    currency: "USD",
  },
  {
    id: "aba5b1d4-73b2-4bab-a68a-8915e7d84714",
    user_id: "c9adc9d8-7511-4f9b-829a-0e638d8bd442",
    property_id: "4c6123ed-0069-4f71-b400-b6ade74de47c",
    start_date: "2026-01-07T00:00:00.000Z",
    end_date: "2026-01-13T00:00:00.000Z",
    day_price: 1000,
    total_price: 9000,
    currency: "USD",
  },
];
