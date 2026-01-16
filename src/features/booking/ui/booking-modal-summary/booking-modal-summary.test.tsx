import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { Property } from "@/features/properties/data/properties.types";

import { BookingModalSummary } from "./booking-modal-summary";

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

describe("BookingModalSummary", () => {
  const onDateChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render property data correctly", () => {
    render(<BookingModalSummary property={mockProperty} onDateChange={onDateChange} />);

    const name = screen.getByText("Cozy Beach House");
    const price = screen.getByText("$1.50 per night");
    const button = screen.getByRole("button", { name: "Change" });
    const location = screen.getByText("Miami · USA");

    expect(name).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(location).toBeInTheDocument();
  });

  test("should cll onDateChange callback", async () => {
    const user = userEvent.setup();

    render(<BookingModalSummary property={mockProperty} onDateChange={onDateChange} />);

    const button = screen.getByRole("button", { name: "Change" });

    await user.click(button);

    expect(onDateChange).toHaveBeenCalledTimes(1);
  });
});
