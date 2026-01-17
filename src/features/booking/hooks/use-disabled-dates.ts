import { useMemo } from "react";

import type { Booking } from "../data/booking.types";

export const useDisabledDates = (bookings?: Booking[], property_id?: string) => {
  return useMemo(() => {
    if (!bookings || !property_id) {
      return [];
    }

    return bookings
      .filter((booking) => booking.property_id === property_id)
      .map((booking) => {
        const from = new Date(booking.start_date);
        const to = new Date(booking.end_date);

        return {
          from,
          to,
        };
      });
  }, [bookings, property_id]);
};
