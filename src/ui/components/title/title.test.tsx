import { render, screen } from "@testing-library/react";
import { Title } from "./title";

describe("Title", () => {
  test("should be rendered correctly with children", () => {
    render(<Title>Test Title</Title>);

    const title = screen.getByRole("heading");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Test Title");
  });

  test("should return null when no children is provided", () => {
    render(<Title children={null} />);

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });
});
