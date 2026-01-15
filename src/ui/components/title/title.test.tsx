import { render, screen } from "@testing-library/react";

import { Title } from "./title";

describe("Title", () => {
  test("should be rendered correctly with children", () => {
    render(<Title>Test Title</Title>);

    const title = screen.getByRole("heading");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Test Title");
  });

  test.each([null, undefined, 0, ""])("should return null when %s children is provided", (value) => {
    const { container } = render(<Title>{value}</Title>);

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(container.firstChild).toBeNull();
  });
});
