import { render, screen } from "@testing-library/react";

import { BookingModalHeader } from "./booking-modal-header";

describe("BookingModalHeader", () => {
  test("should render property cover correctly", () => {
    render(<BookingModalHeader cover="/cover.png" name="Cozy cabin" />);

    const cover = screen.getByRole("img");

    console.log(cover.attributes);

    expect(cover).toBeInTheDocument();
    expect(cover).toHaveAttribute("alt", "Cozy cabin");
  });
});
