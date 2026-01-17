import "react-day-picker/style.css";

import { useCallback } from "react";
import { type DateRange, DayPicker, type OnSelectHandler } from "react-day-picker";

import { stripTimezone } from "@/utils/dates";

import { useCurrentBooking, useUpdateCurrrentBooking } from "../../data/booking.store";
import * as S from "./booking-calendar.style";

export const BookingCalendar = () => {
  const currentBooking = useCurrentBooking();
  const updateCurrentBooking = useUpdateCurrrentBooking();
  const start = currentBooking?.start_date;
  const end = currentBooking?.end_date;

  const onSelect: OnSelectHandler<DateRange | undefined> = useCallback(
    (_, triggerDate) => {
      const newDate = stripTimezone(triggerDate);

      if (start && end) {
        updateCurrentBooking({ start_date: newDate, end_date: undefined });
        return;
      }

      if (!start) {
        updateCurrentBooking({ start_date: newDate });
        return;
      }

      if (start && !end) {
        if (newDate < start) {
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

  const before = new Date();
  const from = start ? new Date(start) : undefined;
  const to = end ? new Date(end) : undefined;

  return (
    <S.BookingCalendarContainer>
      <DayPicker
        disabled={{ before }}
        min={2}
        mode="range"
        onSelect={onSelect}
        selected={{ from, to }}
        timeZone="UTC"
      />
    </S.BookingCalendarContainer>
  );
};
