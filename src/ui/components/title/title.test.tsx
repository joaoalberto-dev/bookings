import { render, screen } from "@testing-library/react";

import { Title } from "./title";

describe("Title", () => {
  test("should be rendered correctly with children", () => {
    render(<Title>Test Title</Title>);

    const title = screen.getByRole("heading");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Test Title");
  });

  test("should return null when null children is provided", () => {
    const { container } = render(<Title>{null}</Title>);

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(container.firstChild).toBeNull();
  });

  test("should return null when undefined children is provided", () => {
    const { container } = render(<Title>{undefined}</Title>);

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(container.firstChild).toBeNull();
  });

  test("should return null when empty string is provided", () => {
    const { container } = render(<Title>{""}</Title>);

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(container.firstChild).toBeNull();
  });
});
