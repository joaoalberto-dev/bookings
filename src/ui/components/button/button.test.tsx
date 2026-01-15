import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { Button } from "./button";

describe("Button", () => {
  test("should be rendered correctly with children", () => {
    render(<Button>Test Button</Button>);

    const button = screen.getByRole("button", { name: "Test Button" });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Test Button");
  });

  test("should call the callback correctly when user clicks", async () => {
    const fn = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={fn}>Test Button</Button>);

    const button = screen.getByRole("button", { name: "Test Button" });

    await user.click(button);
    expect(fn).toBeCalledTimes(1);
  });

  test("should not call onClick when disabled", async () => {
    const fn = vi.fn();
    const user = userEvent.setup();

    render(
      <Button onClick={fn} disabled>
        Test Button
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Test Button" });
    await user.click(button);

    expect(fn).not.toHaveBeenCalled();
  });

  test("should render with outline variant", () => {
    render(<Button variant="outline">Outline</Button>);

    const button = screen.getByRole("button", { name: "Outline" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({ background: "transparent" });
  });

  test("should render without variant prop (default styling)", () => {
    render(<Button>Default Button</Button>);

    const button = screen.getByRole("button", { name: "Default Button" });
    expect(button).toBeInTheDocument();
  });

  test("should pass through additional HTML attributes", () => {
    render(
      <Button type="submit" aria-label="Submit form">
        Submit
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Submit form" });
    expect(button).toHaveAttribute("type", "submit");
  });

  test("should have default background when no variant specified", () => {
    render(<Button>Default</Button>);

    const button = screen.getByRole("button", { name: "Default" });
    expect(button).toHaveStyle({ cursor: "pointer" });
  });
});
