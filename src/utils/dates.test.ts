import { formatDateRange } from "./dates";

describe("formatDateRange", () => {
  describe("same month and year", () => {
    test("formats dates within the same month", () => {
      expect(formatDateRange("2024-01-15", "2024-01-20")).toBe("Jan 15-20, 2024");
    });

    test("handles single-digit days", () => {
      expect(formatDateRange("2024-03-05", "2024-03-09")).toBe("Mar 5-9, 2024");
    });

    test("handles month boundaries", () => {
      expect(formatDateRange("2024-02-01", "2024-02-29")).toBe("Feb 1-29, 2024");
    });

    test("handles December", () => {
      expect(formatDateRange("2024-12-10", "2024-12-25")).toBe("Dec 10-25, 2024");
    });
  });

  describe("same year, different months", () => {
    test("formats dates across different months", () => {
      expect(formatDateRange("2024-01-15", "2024-02-20")).toBe("Jan 15 - Feb 20, 2024");
    });

    test("handles dates spanning multiple months", () => {
      expect(formatDateRange("2024-03-28", "2024-05-05")).toBe("Mar 28 - May 5, 2024");
    });

    test("handles year-end within same year", () => {
      expect(formatDateRange("2024-11-20", "2024-12-15")).toBe("Nov 20 - Dec 15, 2024");
    });
  });

  describe("different years", () => {
    test("formats dates across different years", () => {
      expect(formatDateRange("2023-12-28", "2024-01-05")).toBe("Dec 28, 2023 - Jan 5, 2024");
    });

    test("handles dates spanning multiple years", () => {
      expect(formatDateRange("2023-06-15", "2024-08-20")).toBe("Jun 15, 2023 - Aug 20, 2024");
    });

    test("handles far apart years", () => {
      expect(formatDateRange("2020-01-01", "2025-12-31")).toBe("Jan 1, 2020 - Dec 31, 2025");
    });
  });

  describe("edge cases", () => {
    test("handles same date (start === end)", () => {
      expect(formatDateRange("2024-03-15", "2024-03-15")).toBe("Mar 15-15, 2024");
    });

    test("handles leap year dates", () => {
      expect(formatDateRange("2024-02-28", "2024-02-29")).toBe("Feb 28-29, 2024");
    });

    test("handles dates with time information (should ignore time)", () => {
      expect(formatDateRange("2024-01-15T10:30:00.000Z", "2024-01-20T15:45:00.000Z")).toBe("Jan 15-20, 2024");
    });

    test("handles year boundary within same year", () => {
      expect(formatDateRange("2024-01-01", "2024-12-31")).toBe("Jan 1 - Dec 31, 2024");
    });
  });

  describe("real-world booking scenarios", () => {
    test("formats a weekend trip", () => {
      expect(formatDateRange("2024-06-14", "2024-06-16")).toBe("Jun 14-16, 2024");
    });

    test("formats a week-long vacation", () => {
      expect(formatDateRange("2024-07-01", "2024-07-08")).toBe("Jul 1-8, 2024");
    });

    test("formats a cross-month vacation", () => {
      expect(formatDateRange("2024-08-28", "2024-09-05")).toBe("Aug 28 - Sep 5, 2024");
    });

    test("formats a winter holiday trip", () => {
      expect(formatDateRange("2024-12-20", "2025-01-03")).toBe("Dec 20, 2024 - Jan 3, 2025");
    });
  });
});
