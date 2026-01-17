import { fireEvent, render, screen } from "@testing-library/react";
import type { MockedFunction } from "vitest";

import { stripTimezone } from "@/utils/dates";

import { useCurrentBooking, useUpdateCurrrentBooking } from "../../data/booking.store";
import { BookingCalendar } from "./booking-calendar";

vi.mock("../../data/booking.store");

const mockUseCurrentBooking = useCurrentBooking as MockedFunction<typeof useCurrentBooking>;
const mockUseUpdateCurrentBooking = useUpdateCurrrentBooking as MockedFunction<typeof useUpdateCurrrentBooking>;

describe("BookingCalendar", () => {
  const mockUpdateCurrentBooking = vi.fn();

  const MOCK_NOW = new Date("2026-01-15T12:00:00.000Z");

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(MOCK_NOW);

    mockUseUpdateCurrentBooking.mockReturnValue(mockUpdateCurrentBooking);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("should render the calendar component", () => {
    mockUseCurrentBooking.mockReturnValue(null);

    render(<BookingCalendar />);

    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  test("should disable dates before today", () => {
    mockUseCurrentBooking.mockReturnValue(null);

    render(<BookingCalendar />);

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
  });

  describe("when no dates are selected", () => {
    test("should set start_date when clicking a date", () => {
      mockUseCurrentBooking.mockReturnValue(null);

      render(<BookingCalendar />);

      const tomorrow = new Date("2026-01-16T12:00:00.000Z");
      const expectedDate = stripTimezone(tomorrow);

      const dateButton = screen.getByRole("button", {
        name: "Friday, January 16th, 2026",
      });

      fireEvent.click(dateButton);

      expect(mockUpdateCurrentBooking).toHaveBeenCalledWith({
        start_date: expectedDate,
      });
    });
  });

  describe("when only start_date is selected", () => {
    const startDate = stripTimezone(new Date("2026-01-20T12:00:00.000Z"));

    beforeEach(() => {
      mockUseCurrentBooking.mockReturnValue({
        start_date: startDate,
        end_date: undefined,
      });
    });

    test("should set end_date when clicking a later date", () => {
      render(<BookingCalendar />);

      const laterDate = stripTimezone(new Date("2026-01-25T12:00:00.000Z"));
      const dateButton = screen.getByRole("button", {
        name: "Sunday, January 25th, 2026",
      });

      fireEvent.click(dateButton);

      expect(mockUpdateCurrentBooking).toHaveBeenCalledWith({
        end_date: laterDate,
      });
    });

    test("should swap dates when clicking a date before start_date", () => {
      render(<BookingCalendar />);

      const earlierDate = new Date("2026-01-18T12:00:00.000Z");

      const dateButton = screen.getByRole("button", {
        name: "Sunday, January 18th, 2026",
      });

      fireEvent.click(dateButton);

      expect(mockUpdateCurrentBooking).toHaveBeenCalledWith({
        start_date: stripTimezone(earlierDate),
        end_date: startDate,
      });
    });

    test("should not update when clicking the same date as start_date", () => {
      mockUseCurrentBooking.mockReturnValue({
        start_date: undefined,
        end_date: undefined,
      });

      const { rerender } = render(<BookingCalendar />);

      const dateButton = screen.getByRole("button", {
        name: "Tuesday, January 20th, 2026",
      });

      fireEvent.click(dateButton);

      mockUseCurrentBooking.mockReturnValue({
        start_date: startDate,
        end_date: undefined,
      });

      rerender(<BookingCalendar />);

      fireEvent.click(dateButton);

      expect(mockUpdateCurrentBooking).toHaveBeenCalledOnce();
    });
  });

  describe("when both start_date and end_date are selected", () => {
    const startDate = stripTimezone(new Date("2026-01-20T12:00:00.000Z"));
    const endDate = stripTimezone(new Date("2026-01-25T12:00:00.000Z"));

    beforeEach(() => {
      mockUseCurrentBooking.mockReturnValue({
        start_date: startDate,
        end_date: endDate,
      });
    });

    test("should reset selection with new start_date when clicking any date", () => {
      render(<BookingCalendar />);

      const newDate = new Date("2026-01-22T12:00:00.000Z");
      const dateButton = screen.getByRole("button", {
        name: "Thursday, January 22nd, 2026, selected",
      });

      fireEvent.click(dateButton);

      expect(mockUpdateCurrentBooking).toHaveBeenCalledWith({
        start_date: stripTimezone(newDate),
        end_date: undefined,
      });
    });
  });

  test("should handle null currentBooking gracefully", () => {
    mockUseCurrentBooking.mockReturnValue(null);

    expect(() => render(<BookingCalendar />)).not.toThrow();
  });
});
