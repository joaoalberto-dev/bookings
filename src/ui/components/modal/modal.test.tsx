import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useRef } from "react";

import { Modal } from "./modal";

const ModalWrapper = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Modal isOpen={isOpen} onClose={onClose} ref={ref}>
      <h2 id="modal-title">Modal Title</h2>
      <p>Modal content</p>
    </Modal>
  );
};

describe("Modal", () => {
  beforeEach(() => {
    document.body.classList.remove("block-scroll");
  });

  describe("rendering", () => {
    test("should render children when open", () => {
      render(<ModalWrapper isOpen={true} onClose={vi.fn()} />);

      const title = screen.getByText("Modal Title");
      const content = screen.getByText("Modal content");

      expect(title).toBeInTheDocument();
      expect(content).toBeInTheDocument();
    });

    test("should not render when closed", () => {
      render(<ModalWrapper isOpen={false} onClose={vi.fn()} />);

      const noModal = screen.queryByText("Modal Title");
      expect(noModal).not.toBeInTheDocument();
    });

    test("should render close button", () => {
      render(<ModalWrapper isOpen={true} onClose={vi.fn()} />);

      const closeButton = screen.getByRole("button", { name: "Close modal" });
      expect(closeButton).toBeInTheDocument();
    });

    test("should have correct accessibility attributes", () => {
      render(<ModalWrapper isOpen={true} onClose={vi.fn()} />);

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-modal", "true");
    });
  });

  describe("closing behavior", () => {
    test("should call onClose when close button is clicked", async () => {
      const onClose = vi.fn();
      const user = userEvent.setup();

      render(<ModalWrapper isOpen={true} onClose={onClose} />);

      await user.click(screen.getByRole("button", { name: "Close modal" }));

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    test("should call onClose when Escape key is pressed", async () => {
      const onClose = vi.fn();
      const user = userEvent.setup();

      render(<ModalWrapper isOpen={true} onClose={onClose} />);

      await user.keyboard("{Escape}");

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    test("should call onClose when clicking on overlay", async () => {
      const onClose = vi.fn();
      const user = userEvent.setup();

      render(<ModalWrapper isOpen={true} onClose={onClose} />);

      const overlay = screen.getByRole("dialog").parentElement;
      // @ts-expect-error -- Tests only
      await user.click(overlay);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    test("should not call onClose when clicking inside modal content", async () => {
      const onClose = vi.fn();
      const user = userEvent.setup();

      render(<ModalWrapper isOpen={true} onClose={onClose} />);

      await user.click(screen.getByText("Modal content"));

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe("scroll blocking", () => {
    test("should add block-scroll class to body when opened", () => {
      render(<ModalWrapper isOpen={true} onClose={vi.fn()} />);

      expect(document.body.classList.contains("block-scroll")).toBe(true);
    });

    test("should remove block-scroll class from body whe closed", () => {
      const { rerender } = render(<ModalWrapper isOpen={true} onClose={vi.fn()} />);

      expect(document.body.classList.contains("block-scroll")).toBe(true);

      rerender(<ModalWrapper isOpen={false} onClose={vi.fn()} />);

      expect(document.body.classList.contains("block-scroll")).toBe(false);
    });

    test("should not add block-scroll class when modal is closed", () => {
      render(<ModalWrapper isOpen={false} onClose={vi.fn()} />);

      expect(document.body.classList.contains("block-scroll")).toBe(false);
    });
  });

  describe("cleanup", () => {
    test("should remove event listener on unmount", async () => {
      const onClose = vi.fn();
      const user = userEvent.setup();

      const { unmount } = render(<ModalWrapper isOpen={true} onClose={onClose} />);

      unmount();

      await user.keyboard("{Escape}");

      expect(onClose).not.toHaveBeenCalled();
    });

    test("should remove block-scroll class on unmount", () => {
      const { unmount } = render(<ModalWrapper isOpen={true} onClose={vi.fn()} />);

      expect(document.body.classList.contains("block-scroll")).toBe(true);

      unmount();

      expect(document.body.classList.contains("block-scroll")).toBe(false);
    });
  });

  describe("focus management", () => {
    test("should focus modal content when opened", () => {
      render(<ModalWrapper isOpen={true} onClose={vi.fn()} />);

      const modal = screen.getByRole("dialog");
      expect(modal).toHaveFocus();
    });
  });
});
