import type { Property } from "@/features/properties/data/properties.types";
import { Button } from "@/ui/components/button/button";
import { toCurrency } from "@/utils/to-currency";

import * as S from "./booking-modal-summary.style";

interface BookingModalSummaryProps {
  property: Property;
  onDateChange: () => void;
}

export const BookingModalSummary = ({ property, onDateChange }: BookingModalSummaryProps) => {
  return (
    <S.BookingModalSummaryDivider>
      <S.BookingModalSummaryTitle>{property.name}</S.BookingModalSummaryTitle>
      <S.BookingModalSummaryDetails>
        <li>
          <S.BookingModalSummaryText>
            {toCurrency(property.day_price, property.currency)} per night
          </S.BookingModalSummaryText>
          <Button onClick={onDateChange} variant="outline">
            Change
          </Button>
        </li>
        <li>
          <S.BookingModalSummaryText>
            {property.location.city} · {property.location.country}
          </S.BookingModalSummaryText>
        </li>
      </S.BookingModalSummaryDetails>
    </S.BookingModalSummaryDivider>
  );
};
