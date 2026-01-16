import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BookingModal } from "./booking-modal";

describe("BookingModal", () => {
  const onClose = vi.fn();

  test("should render booking modal correctly", async () => {
    const user = userEvent.setup();

    render(
      <BookingModal onClose={onClose}>
        <p>Booking</p>
      </BookingModal>,
    );

    const content = screen.getByText("Booking");
    expect(content).toBeInTheDocument();

    const button = screen.getByRole("button", { name: "Close modal" });
    await user.click(button);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
