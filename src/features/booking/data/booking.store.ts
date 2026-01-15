import { create } from "zustand";

import { type Booking } from "./booking.types";

interface BookingState {
  bookings: Booking[];
  error: string | null;
}

const useBookingStore = create<BookingState>(() => ({
  bookings: [],
  error: null,
}));

export const useBookings = () => useBookingStore((store) => store.bookings);
