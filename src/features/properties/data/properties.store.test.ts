import { renderHook } from "@testing-library/react";

import { useProperties, useProperty } from "./properties.store";

describe("useProperties", () => {
  test("useProperties should start with 30 items", () => {
    const { result } = renderHook(() => useProperties());

    expect(result.current.length).toBe(30);
  });
});

describe("useProperty", () => {
  test("useProperty should return the property when the id exist", () => {
    const { result } = renderHook(() => useProperty("a1b1c1d1-0001-4a1a-9b1b-111111111111"));

    expect(result.current).toEqual({
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

  test("useProperty should return the property when the id exist", () => {
    const { result } = renderHook(() => useProperty("abc"));

    expect(result.current).toBe(undefined);
  });
});
