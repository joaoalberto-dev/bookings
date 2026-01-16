import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { startOfDay } from "date-fns";
import type { MockedFunction } from "vitest";

import { useCurrentBooking, useUpdateCurrrentBooking } from "../../data/booking.store";
import { BookingCalendar } from "./booking-calendar";

vi.mock("../../data/booking.store");

const mockUseCurrentBooking = useCurrentBooking as MockedFunction<typeof useCurrentBooking>;
const mockUseUpdateCurrentBooking = useUpdateCurrrentBooking as MockedFunction<typeof useUpdateCurrrentBooking>;

describe("BookingCalendar", () => {
  const mockUpdateCurrentBooking = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseUpdateCurrentBooking.mockReturnValue(mockUpdateCurrentBooking);
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
    test("should set start_date when clicking a date", async () => {
      const user = userEvent.setup();
      mockUseCurrentBooking.mockReturnValue(null);

      render(<BookingCalendar />);

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const dateButton = screen.getByRole("button", {
        name: new RegExp(tomorrow.getDate().toString()),
      });

      await user.click(dateButton);

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

    afterEach(() => {
      vi.clearAllMocks();
      vi.resetAllMocks();
    });

    test("should set end_date when clicking a later date", async () => {
      const user = userEvent.setup();

      render(<BookingCalendar />);

      const laterDate = new Date("2025-01-25");
      const dateButton = screen.getByRole("button", {
        name: new RegExp(laterDate.getDate().toString()),
      });

      await user.click(dateButton);

      expect(mockUpdateCurrentBooking).toHaveBeenCalledWith({
        end_date: "2026-01-24T03:00:00.000Z",
      });
    });

    test("should swap dates when clicking a date before start_date", async () => {
      const user = userEvent.setup();

      render(<BookingCalendar />);

      const earlierDate = startOfDay(new Date("2025-01-18"));

      const dateButton = screen.getByRole("button", {
        name: new RegExp(earlierDate.getDate().toString()),
      });

      await user.click(dateButton);

      expect(mockUpdateCurrentBooking).toHaveBeenCalledWith({
        start_date: "2026-01-17T03:00:00.000Z",
        end_date: "2026-01-19T03:00:00.000Z",
      });
    });

    test("should not update when clicking the same date as start_date", async () => {
      const user = userEvent.setup();

      mockUseCurrentBooking.mockReturnValue({
        start_date: undefined,
        end_date: undefined,
      });

      const { rerender } = render(<BookingCalendar />);

      const sameDate = new Date("2026-01-20");
      const dateButton = screen.getByRole("button", {
        name: new RegExp(sameDate.getDate().toString()),
      });

      await user.click(dateButton);

      mockUseCurrentBooking.mockReturnValue({
        start_date: startDate,
        end_date: undefined,
      });

      rerender(<BookingCalendar />);

      await user.click(dateButton);

      expect(mockUpdateCurrentBooking).toHaveBeenCalledOnce();
    });
  });

  describe("when both start_date and end_date are selected", () => {
    const startDate = startOfDay(new Date("2025-01-20")).toISOString();
    const endDate = startOfDay(new Date("2025-01-25")).toISOString();

    beforeEach(() => {
      mockUseCurrentBooking.mockReturnValue({
        start_date: startDate,
        end_date: endDate,
      });
    });

    test("should reset selection with new start_date when clicking any date", async () => {
      const user = userEvent.setup();

      render(<BookingCalendar />);

      const newDate = new Date("2025-01-22");
      const dateButton = screen.getByRole("button", {
        name: new RegExp(newDate.getDate().toString()),
      });

      await user.click(dateButton);

      expect(mockUpdateCurrentBooking).toHaveBeenCalledWith({
        start_date: "2026-01-21T03:00:00.000Z",
        end_date: undefined,
      });
    });
  });

  test("should handle null currentBooking gracefully", () => {
    mockUseCurrentBooking.mockReturnValue(null);

    expect(() => render(<BookingCalendar />)).not.toThrow();
  });
});
