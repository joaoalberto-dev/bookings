import type { ReactNode } from "react";

import { Modal } from "@/ui/components/modal/modal";

import * as S from "./booking-modal.style";

interface BookingModalProps {
  onClose: () => void;
  children: ReactNode;
}

export const BookingModal = ({ onClose, children }: BookingModalProps) => {
  return (
    <Modal onClose={onClose} isOpen>
      <S.BookingModalContainer>{children}</S.BookingModalContainer>
    </Modal>
  );
};
