import type { Property } from "@/features/properties/data/properties.types";
import { Button } from "@/ui/components/button/button";
import { formatDateRange } from "@/utils/dates";
import { toCurrency } from "@/utils/to-currency";

import { useBookingNights, useCurrentBooking } from "../../data/booking.store";
import * as S from "./booking-modal-footer.style";

interface BookingModalFooterProps {
  property: Property;
  confirmText: string;
  disabled: boolean;
  onConfirm: () => void;
}

export const BookingModalFooter = ({ property, confirmText, onConfirm, disabled }: BookingModalFooterProps) => {
  const currentBooking = useCurrentBooking();
  const nights = useBookingNights();
  const price = nights * property.day_price;

  return (
    <S.BookingModalFooterContainer>
      <div>
        <S.BookingModalPrice>{toCurrency(price, property.currency)}</S.BookingModalPrice>
        <S.BookingModalSmall>
          {currentBooking?.start_date && currentBooking.end_date
            ? formatDateRange(currentBooking.start_date, currentBooking.end_date)
            : "per night"}
        </S.BookingModalSmall>
      </div>
      <Button disabled={disabled} onClick={onConfirm}>
        {confirmText}
      </Button>
    </S.BookingModalFooterContainer>
  );
};
