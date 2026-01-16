import { fireEvent, render, screen } from "@testing-library/react";
import { startOfDay } from "date-fns";
import type { MockedFunction } from "vitest";

import { useCurrentBooking, useUpdateCurrrentBooking } from "../../data/booking.store";
import { BookingCalendar } from "./booking-calendar";

vi.mock("../../data/booking.store");

const mockUseCurrentBooking = useCurrentBooking as MockedFunction<typeof useCurrentBooking>;
const mockUseUpdateCurrentBooking = useUpdateCurrrentBooking as MockedFunction<typeof useUpdateCurrrentBooking>;

describe("BookingCalendar", () => {
  const mockUpdateCurrentBooking = vi.fn();

  const MOCK_NOW = new Date("2026-01-15T03:00:00.000Z");

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

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const dateButton = screen.getByRole("button", {
        name: new RegExp(tomorrow.getDate().toString()),
      });

      fireEvent.click(dateButton);

      expect(mockUpdateCurrentBooking).toHaveBeenCalledWith({
        start_date: tomorrow.toISOString(),
      });
    });
  });

  describe("when only start_date is selected", () => {
    const startDate = startOfDay(new Date("2026-01-20")).toISOString();

    beforeEach(() => {
      mockUseCurrentBooking.mockReturnValue({
        start_date: startDate,
        end_date: undefined,
      });
    });

    test("should set end_date when clicking a later date", () => {
      render(<BookingCalendar />);

      const laterDate = new Date("2026-01-25");
      const dateButton = screen.getByRole("button", {
        name: new RegExp(laterDate.getDate().toString()),
      });

      fireEvent.click(dateButton);

      expect(mockUpdateCurrentBooking).toHaveBeenCalledWith({
        end_date: startOfDay(laterDate).toISOString(),
      });
    });

    test("should swap dates when clicking a date before start_date", () => {
      render(<BookingCalendar />);

      const earlierDate = new Date("2026-01-18");

      const dateButton = screen.getByRole("button", {
        name: new RegExp(earlierDate.getDate().toString()),
      });

      fireEvent.click(dateButton);

      expect(mockUpdateCurrentBooking).toHaveBeenCalledWith({
        start_date: startOfDay(earlierDate).toISOString(),
        end_date: startDate,
      });
    });

    test("should not update when clicking the same date as start_date", () => {
      mockUseCurrentBooking.mockReturnValue({
        start_date: undefined,
        end_date: undefined,
      });

      const { rerender } = render(<BookingCalendar />);

      const sameDate = new Date("2026-01-20");
      const dateButton = screen.getByRole("button", {
        name: new RegExp(sameDate.getDate().toString()),
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
    const startDate = startOfDay(new Date("2026-01-20")).toISOString();
    const endDate = startOfDay(new Date("2026-01-25")).toISOString();

    beforeEach(() => {
      mockUseCurrentBooking.mockReturnValue({
        start_date: startDate,
        end_date: endDate,
      });
    });

    test("should reset selection with new start_date when clicking any date", () => {
      render(<BookingCalendar />);

      const newDate = new Date("2026-01-22");
      const dateButton = screen.getByRole("button", {
        name: new RegExp(newDate.getDate().toString()),
      });

      fireEvent.click(dateButton);

      expect(mockUpdateCurrentBooking).toHaveBeenCalledWith({
        start_date: startOfDay(newDate).toISOString(),
        end_date: undefined,
      });
    });
  });

  test("should handle null currentBooking gracefully", () => {
    mockUseCurrentBooking.mockReturnValue(null);

    expect(() => render(<BookingCalendar />)).not.toThrow();
  });
});
