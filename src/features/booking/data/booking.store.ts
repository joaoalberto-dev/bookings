import { create } from "zustand";

import { diffDaysISO } from "@/utils/dates";

import { type Booking } from "./booking.types";

interface BookingState {
  bookings: Booking[];
  currentBooking: Partial<Booking> | null;
  error: string | null;
  updateCurrentBooking: (booking: Partial<Booking> | null) => void;
  clearCurrentBooking: () => void;
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
  clearCurrentBooking() {
    set({ currentBooking: null });
  },
  createBooking(booking: Booking) {
    set({
      bookings: [...get().bookings, booking],
    });
  },
}));

export const useBookings = () => useBookingStore((store) => store.bookings);
export const useCurrentBooking = () => useBookingStore((store) => store.currentBooking);
export const useCreateBooking = () => useBookingStore((store) => store.createBooking);
export const useUpdateCurrrentBooking = () => useBookingStore((store) => store.updateCurrentBooking);
export const useClearCurrentBooking = () => useBookingStore((store) => store.clearCurrentBooking);
export const useBookingNights = () =>
  useBookingStore((store) => {
    const start = store.currentBooking?.start_date;
    const end = store.currentBooking?.end_date;

    if (!start || !end) return 1;

    return diffDaysISO(end, start);
  });
