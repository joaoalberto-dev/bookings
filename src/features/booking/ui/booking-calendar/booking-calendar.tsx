import "react-day-picker/style.css";

import { isBefore, startOfDay } from "date-fns";
import { useCallback } from "react";
import { type DateRange, DayPicker, type OnSelectHandler } from "react-day-picker";

import { useCurrentBooking, useUpdateCurrrentBooking } from "../../data/booking.store";
import * as S from "./booking-calendar.style";

export const BookingCalendar = () => {
  const currentBooking = useCurrentBooking();
  const updateCurrentBooking = useUpdateCurrrentBooking();
  const start = currentBooking?.start_date;
  const end = currentBooking?.end_date;

  const onSelect: OnSelectHandler<DateRange | undefined> = useCallback(
    (_, triggerDate) => {
      const newDate = startOfDay(triggerDate).toISOString();

      if (start && end) {
        updateCurrentBooking({ start_date: newDate, end_date: undefined });
        return;
      }

      if (!start) {
        updateCurrentBooking({ start_date: newDate });
        return;
      }

      if (start && !end) {
        if (isBefore(newDate, start)) {
          updateCurrentBooking({ start_date: newDate, end_date: start });
        } else if (newDate === start) {
          return;
        } else {
          updateCurrentBooking({ end_date: newDate });
        }

        return;
      }
    },
    [start, end, updateCurrentBooking],
  );

  const before = startOfDay(new Date());
  const from = start ? new Date(start) : undefined;
  const to = end ? new Date(end) : undefined;

  return (
    <S.BookingCalendarContainer>
      <DayPicker mode="range" min={2} onSelect={onSelect} disabled={{ before }} selected={{ from, to }} />
    </S.BookingCalendarContainer>
  );
};
