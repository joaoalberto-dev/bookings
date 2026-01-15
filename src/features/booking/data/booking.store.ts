import { create } from "zustand";

import { type Booking } from "./booking.types";

interface BookingState {
  bookings: Booking[];
  currentBooking: Partial<Booking> | null;
  error: string | null;
  updateCurrentBooking: (booking: Partial<Booking> | null) => void;
  createBooking: (booking: Booking) => void;
}

const useBookingStore = create<BookingState>((set, get) => ({
  bookings: [],
  currentBooking: null,
  error: null,
  updateCurrentBooking(inputBooking) {
    set({
      currentBooking: {
        ...get().currentBooking,
        ...inputBooking,
      },
    });
  },
  createBooking(booking: Booking) {
    set({
      bookings: [...get().bookings, booking],
    });
  },
}));

export const useBookings = () => useBookingStore((store) => store.bookings);
export const useCurrentBooking = () => useBookingStore((store) => store.currentBooking);
export const useUpdateBooking = () => useBookingStore((store) => store.updateCurrentBooking);
