import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { Property } from "@/features/properties/data/properties.types";

import { BookingModalFooter } from "./booking-modal-footer";

vi.mock("../../data/booking.store", () => ({
  useCurrentBooking: vi.fn(),
  useBookingNights: vi.fn(),
}));

import { useBookingNights, useCurrentBooking } from "../../data/booking.store";

const mockProperty: Property = {
  id: "1111-2222",
  name: "Cozy Beach House",
  description: "",
  cover: "",
  day_price: 150,
  currency: "USD",
  location: {
    city: "Miami",
    country: "USA",
  },
};

describe("BookingModalFooter", () => {
  const defaultProps = {
    property: mockProperty,
    confirmText: "Book now",
    disabled: false,
    onConfirm: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("without selected dates", () => {
    beforeEach(() => {
      vi.mocked(useCurrentBooking).mockReturnValue(null);
      vi.mocked(useBookingNights).mockReturnValue(1);
    });

    test("should displays price for 1 night", () => {
      render(<BookingModalFooter {...defaultProps} />);

      expect(screen.getByText("$1.50")).toBeInTheDocument();
      expect(screen.getByText("per night")).toBeInTheDocument();
    });

    test("renders confirm button with correct text", () => {
      render(<BookingModalFooter {...defaultProps} />);

      expect(screen.getByRole("button", { name: "Book now" })).toBeInTheDocument();
    });

    test("button is enabled when disabled prop is false", () => {
      render(<BookingModalFooter {...defaultProps} />);

      expect(screen.getByRole("button")).not.toBeDisabled();
    });

    test("calls onConfirm when button is clicked", async () => {
      const user = userEvent.setup();
      render(<BookingModalFooter {...defaultProps} />);

      await user.click(screen.getByRole("button", { name: "Book now" }));

      expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
    });
  });

  describe("with only start date", () => {
    beforeEach(() => {
      vi.mocked(useCurrentBooking).mockReturnValue({
        property_id: "prop-1",
        start_date: "2026-03-15",
        end_date: undefined,
      });
      vi.mocked(useBookingNights).mockReturnValue(1);
    });

    test("shows 'per night' when end date is missing", () => {
      render(<BookingModalFooter {...defaultProps} />);

      expect(screen.getByText("per night")).toBeInTheDocument();
    });
  });

  describe("with selected date range", () => {
    beforeEach(() => {
      vi.mocked(useCurrentBooking).mockReturnValue({
        property_id: "prop-1",
        start_date: "2026-03-15",
        end_date: "2026-03-20",
      });
      vi.mocked(useBookingNights).mockReturnValue(5);
    });

    test("calculates total price correctly", () => {
      render(<BookingModalFooter {...defaultProps} />);

      expect(screen.getByText("$7.50")).toBeInTheDocument();
    });

    test("displays formatted date range (same month)", () => {
      render(<BookingModalFooter {...defaultProps} />);

      expect(screen.getByText(/Mar 15-20, 2026/)).toBeInTheDocument();
    });

    test("does not show 'per night' text", () => {
      render(<BookingModalFooter {...defaultProps} />);

      expect(screen.queryByText("per night")).not.toBeInTheDocument();
    });
  });

  describe("with different date ranges", () => {
    test("formats cross-month date range correctly", () => {
      vi.mocked(useCurrentBooking).mockReturnValue({
        property_id: "prop-1",
        start_date: "2026-03-28",
        end_date: "2026-04-05",
      });
      vi.mocked(useBookingNights).mockReturnValue(8);

      render(<BookingModalFooter {...defaultProps} />);

      expect(screen.getByText(/Mar 28 - Apr 5, 2026/)).toBeInTheDocument();
      expect(screen.getByText("$12.00")).toBeInTheDocument();
    });

    test("formats cross-year date range correctly", () => {
      vi.mocked(useCurrentBooking).mockReturnValue({
        property_id: "prop-1",
        start_date: "2025-12-28",
        end_date: "2026-01-05",
      });
      vi.mocked(useBookingNights).mockReturnValue(8);

      render(<BookingModalFooter {...defaultProps} />);

      expect(screen.getByText(/Dec 28, 2025 - Jan 5, 2026/)).toBeInTheDocument();
    });
  });

  describe("with different currencies", () => {
    test("displays BRL correctly", () => {
      vi.mocked(useCurrentBooking).mockReturnValue(null);
      vi.mocked(useBookingNights).mockReturnValue(1);

      const realProperty: Property = {
        ...mockProperty,
        currency: "BRL",
        day_price: 12000,
      };

      render(<BookingModalFooter {...defaultProps} property={realProperty} />);

      expect(screen.getByText("R$120.00")).toBeInTheDocument();
    });

    test("displays BRL correctly", () => {
      vi.mocked(useCurrentBooking).mockReturnValue(null);
      vi.mocked(useBookingNights).mockReturnValue(1);

      const brlProperty: Property = {
        ...mockProperty,
        currency: "BRL",
        day_price: 50000,
      };

      render(<BookingModalFooter {...defaultProps} property={brlProperty} />);

      expect(screen.getByText("R$500.00")).toBeInTheDocument();
    });

    test("calculates total with BRL for multiple nights", () => {
      vi.mocked(useCurrentBooking).mockReturnValue({
        property_id: "prop-1",
        start_date: "2026-06-01",
        end_date: "2026-06-04",
      });
      vi.mocked(useBookingNights).mockReturnValue(3);

      const realProperty: Property = {
        ...mockProperty,
        currency: "BRL",
        day_price: 12000,
      };

      render(<BookingModalFooter {...defaultProps} property={realProperty} />);

      expect(screen.getByText("R$360.00")).toBeInTheDocument();
    });
  });

  describe("button states", () => {
    beforeEach(() => {
      vi.mocked(useCurrentBooking).mockReturnValue(null);
      vi.mocked(useBookingNights).mockReturnValue(1);
    });

    test("disables button when disabled prop is true", () => {
      render(<BookingModalFooter {...defaultProps} disabled={true} />);

      expect(screen.getByRole("button")).toBeDisabled();
    });

    test("does not call onConfirm when disabled button is clicked", async () => {
      const user = userEvent.setup();
      render(<BookingModalFooter {...defaultProps} disabled={true} />);

      await user.click(screen.getByRole("button"));

      expect(defaultProps.onConfirm).not.toHaveBeenCalled();
    });

    test("renders custom confirm text", () => {
      render(<BookingModalFooter {...defaultProps} confirmText="Reserve property" />);

      expect(screen.getByRole("button", { name: "Reserve property" })).toBeInTheDocument();
    });
  });

  describe("price calculations", () => {
    test("calculates correctly for 1 night", () => {
      vi.mocked(useCurrentBooking).mockReturnValue({
        property_id: "prop-1",
        start_date: "2026-03-15",
        end_date: "2026-03-16",
      });
      vi.mocked(useBookingNights).mockReturnValue(1);

      render(<BookingModalFooter {...defaultProps} />);

      expect(screen.getByText("$1.50")).toBeInTheDocument();
    });

    test("calculates correctly for 7 nights", () => {
      vi.mocked(useCurrentBooking).mockReturnValue({
        property_id: "prop-1",
        start_date: "2026-03-15",
        end_date: "2026-03-22",
      });
      vi.mocked(useBookingNights).mockReturnValue(7);

      render(<BookingModalFooter {...defaultProps} />);

      expect(screen.getByText("$10.50")).toBeInTheDocument();
    });

    test("handles large amounts with proper formatting", () => {
      vi.mocked(useCurrentBooking).mockReturnValue({
        property_id: "prop-1",
        start_date: "2026-03-01",
        end_date: "2026-03-31",
      });
      vi.mocked(useBookingNights).mockReturnValue(30);

      render(<BookingModalFooter {...defaultProps} />);

      expect(screen.getByText("$45.00")).toBeInTheDocument();
    });
  });

  describe("edge cases", () => {
    test("handles missing currentBooking gracefully", () => {
      vi.mocked(useCurrentBooking).mockReturnValue(null);
      vi.mocked(useBookingNights).mockReturnValue(1);

      render(<BookingModalFooter {...defaultProps} />);

      expect(screen.getByText("$1.50")).toBeInTheDocument();
      expect(screen.getByText("per night")).toBeInTheDocument();
    });
  });

  describe("reactivity", () => {
    test("updates when nights change", () => {
      vi.mocked(useCurrentBooking).mockReturnValue({
        property_id: "prop-1",
        start_date: "2026-03-15",
        end_date: "2026-03-17",
      });
      vi.mocked(useBookingNights).mockReturnValue(2);

      const { rerender } = render(<BookingModalFooter {...defaultProps} />);

      expect(screen.getByText("$3.00")).toBeInTheDocument();

      vi.mocked(useCurrentBooking).mockReturnValue({
        property_id: "prop-1",
        start_date: "2026-03-15",
        end_date: "2026-03-20",
      });

      vi.mocked(useBookingNights).mockReturnValue(5);

      rerender(<BookingModalFooter {...defaultProps} />);

      expect(screen.getByText("$7.50")).toBeInTheDocument();
    });
  });
});
