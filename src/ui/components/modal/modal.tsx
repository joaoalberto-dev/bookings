import { type MouseEvent, type ReactNode, type RefObject, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

import * as S from "./modal.style";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabelledBy?: string;
  ref?: RefObject<HTMLDivElement | null>;
}

export const Modal = ({ isOpen, onClose, children, ref, ariaLabelledBy }: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement;
    ref?.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.classList.add("block-scroll");

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.classList.remove("block-scroll");

      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [isOpen, onClose, ref]);

  const onOverlayClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) onClose();
    },
    [onClose],
  );

  if (!isOpen) return null;

  return createPortal(
    <S.ModalOverlay onClick={onOverlayClick}>
      <S.ModalContent ref={ref} role="dialog" aria-modal="true" aria-labelledby={ariaLabelledBy} tabIndex={-1}>
        <S.ModalClose type="button" onClick={onClose} aria-label="Close modal">
          ×
        </S.ModalClose>
        {children}
      </S.ModalContent>
    </S.ModalOverlay>,
    document.body,
  );
};
