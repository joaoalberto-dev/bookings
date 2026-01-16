import * as S from "./booking-modal-header.style";

interface BookingModalHeaderProps {
  cover: string;
  name: string;
}

export const BookingModalHeader = ({ cover, name }: BookingModalHeaderProps) => {
  return <S.BookingModalHeaderImage src={cover} alt={name} />;
};
