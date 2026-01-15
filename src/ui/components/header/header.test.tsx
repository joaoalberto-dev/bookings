import { render, screen } from "@testing-library/react";

import { Header } from "./header";

describe("Header", () => {
  test("should be rendered correctly with title", () => {
    render(<Header title="Test Title" />);

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Test Title");
  });

  test.each([null, undefined, false, 0, ""])("should return null when %s title is provided", (value) => {
    // @ts-expect-error -- Tests only
    const { container } = render(<Header title={value} />);

    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
    expect(container.firstChild).toBeNull();
  });
});
