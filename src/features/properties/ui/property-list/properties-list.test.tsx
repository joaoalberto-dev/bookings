import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PropertiesList } from "./properties-list";

describe("PropertiesList", () => {
  test("should renders all properties from the store", () => {
    const onPropertySelect = vi.fn();

    render(<PropertiesList onPropertySelect={onPropertySelect} />);

    expect(screen.getByText("Modern loft in downtown")).toBeInTheDocument();
    expect(screen.getByText("Cozy mountain cabin")).toBeInTheDocument();
  });

  test("should displays property details correctly", () => {
    const onPropertySelect = vi.fn();

    render(<PropertiesList onPropertySelect={onPropertySelect} />);

    const title = screen.getByText("Modern loft in downtown");
    const price = screen.getByText("$180.00 for 1 night");
    const location = screen.getByText("New York");

    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(location).toBeInTheDocument();
  });

  test("should renders property images with correct alt text", () => {
    const onPropertySelect = vi.fn();

    render(<PropertiesList onPropertySelect={onPropertySelect} />);

    const modernLoft = screen.getByAltText("Modern loft in downtown");
    const cozyCabin = screen.getByAltText("Cozy mountain cabin");

    expect(modernLoft).toBeInTheDocument();
    expect(cozyCabin).toBeInTheDocument();
  });

  test("should calls onPropertySelect with correct property when clicked", async () => {
    const onPropertySelect = vi.fn();
    const user = userEvent.setup();

    render(<PropertiesList onPropertySelect={onPropertySelect} />);

    const firstProperty = screen.getAllByRole("listitem")[0];
    await user.click(firstProperty);

    expect(onPropertySelect).toHaveBeenCalledTimes(1);
    expect(onPropertySelect).toHaveBeenCalledWith({
      id: "a1b1c1d1-0001-4a1a-9b1b-111111111111",
      name: "Modern loft in downtown",
      description:
        "A stylish loft with open spaces and contemporary design, ideal for short and long stays.\n\nAmenities:\n\nOpen-plan living area\n\nHigh-speed Wi-Fi\n\nEquipped kitchen\n\nWorkspace",
      cover: "/properties/images/1.jpg",
      day_price: 18000,
      currency: "USD",
      location: {
        city: "New York",
        country: "United States",
      },
    });
  });

  test("should renders properties in a grid layout", () => {
    const onPropertySelect = vi.fn();

    render(<PropertiesList onPropertySelect={onPropertySelect} />);

    const list = screen.getByRole("list");
    const computedStyle = window.getComputedStyle(list);

    expect(computedStyle.display).toBe("grid");
  });
});
