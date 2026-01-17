import "react-day-picker/style.css";

import { useCallback } from "react";
import { type DateRange, DayPicker, type OnSelectHandler } from "react-day-picker";

import { isDatesOverlapping, stripTimezone } from "@/utils/dates";

import { useBookings, useCurrentBooking, useUpdateCurrrentBooking } from "../../data/booking.store";
import { useDisabledDates } from "../../hooks/use-disabled-dates";
import * as S from "./booking-calendar.style";

export const BookingCalendar = () => {
  const bookings = useBookings();
  const currentBooking = useCurrentBooking();
  const updateCurrentBooking = useUpdateCurrrentBooking();
  const disabledDates = useDisabledDates(bookings, currentBooking?.property_id);
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
        if (newDate === start) return;

        const candidateStart = newDate < start ? newDate : start;
        const candidateEnd = newDate > start ? newDate : start;
        const blocked = disabledDates.map(({ from, to }) => ({
          from: stripTimezone(from),
          to: stripTimezone(to),
        }));

        const hasOverlap = isDatesOverlapping(blocked, {
          start: candidateStart,
          end: candidateEnd,
        });

        if (hasOverlap) {
          updateCurrentBooking({ start_date: newDate, end_date: undefined });
          return;
        }

        updateCurrentBooking({
          start_date: candidateStart,
          end_date: candidateEnd,
        });
      }
    },
    [start, end, updateCurrentBooking, disabledDates],
  );

  const before = new Date();
  const from = start ? new Date(start) : undefined;
  const to = end ? new Date(end) : undefined;

  return (
    <S.BookingCalendarContainer>
      <DayPicker
        disabled={[{ before }, ...disabledDates]}
        excludeDisabled
        min={2}
        mode="range"
        onSelect={onSelect}
        selected={{ from, to }}
        timeZone="UTC"
      />
    </S.BookingCalendarContainer>
  );
};
