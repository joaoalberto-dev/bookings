import { formatDateRange } from "./dates";

describe("formatDateRange", () => {
  describe("same month and year", () => {
    test("formats dates within the same month", () => {
      expect(formatDateRange("2026-01-15", "2026-01-20")).toBe("Jan 15-20, 2026");
    });

    test("handles single-digit days", () => {
      expect(formatDateRange("2026-03-05", "2026-03-09")).toBe("Mar 5-9, 2026");
    });

    test("handles month boundaries", () => {
      expect(formatDateRange("2026-02-01", "2026-02-29")).toBe("Feb 1-29, 2026");
    });

    test("handles December", () => {
      expect(formatDateRange("2026-12-10", "2026-12-25")).toBe("Dec 10-25, 2026");
    });
  });

  describe("same year, different months", () => {
    test("formats dates across different months", () => {
      expect(formatDateRange("2026-01-15", "2026-02-20")).toBe("Jan 15 - Feb 20, 2026");
    });

    test("handles dates spanning multiple months", () => {
      expect(formatDateRange("2026-03-28", "2026-05-05")).toBe("Mar 28 - May 5, 2026");
    });

    test("handles year-end within same year", () => {
      expect(formatDateRange("2026-11-20", "2026-12-15")).toBe("Nov 20 - Dec 15, 2026");
    });
  });

  describe("different years", () => {
    test("formats dates across different years", () => {
      expect(formatDateRange("2023-12-28", "2026-01-05")).toBe("Dec 28, 2023 - Jan 5, 2026");
    });

    test("handles dates spanning multiple years", () => {
      expect(formatDateRange("2023-06-15", "2026-08-20")).toBe("Jun 15, 2023 - Aug 20, 2026");
    });

    test("handles far apart years", () => {
      expect(formatDateRange("2020-01-01", "2026-12-31")).toBe("Jan 1, 2020 - Dec 31, 2026");
    });
  });

  describe("edge cases", () => {
    test("handles same date (start === end)", () => {
      expect(formatDateRange("2026-03-15", "2026-03-15")).toBe("Mar 15-15, 2026");
    });

    test("handles leap year dates", () => {
      expect(formatDateRange("2026-02-28", "2026-02-29")).toBe("Feb 28-29, 2026");
    });

    test("handles dates with time information (should ignore time)", () => {
      expect(formatDateRange("2026-01-15T10:30:00.000Z", "2026-01-20T15:45:00.000Z")).toBe("Jan 15-20, 2026");
    });

    test("handles year boundary within same year", () => {
      expect(formatDateRange("2026-01-01", "2026-12-31")).toBe("Jan 1 - Dec 31, 2026");
    });
  });

  describe("real-world booking scenarios", () => {
    test("formats a weekend trip", () => {
      expect(formatDateRange("2026-06-14", "2026-06-16")).toBe("Jun 14-16, 2026");
    });

    test("formats a week-long vacation", () => {
      expect(formatDateRange("2026-07-01", "2026-07-08")).toBe("Jul 1-8, 2026");
    });

    test("formats a cross-month vacation", () => {
      expect(formatDateRange("2026-08-28", "2026-09-05")).toBe("Aug 28 - Sep 5, 2026");
    });

    test("formats a winter holiday trip", () => {
      expect(formatDateRange("2026-12-20", "2026-01-03")).toBe("Dec 20, 2026 - Jan 3, 2026");
    });
  });
});
