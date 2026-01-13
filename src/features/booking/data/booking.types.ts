import { type } from "arktype";

import { currency } from "@/types";

export const booking = type({
  id: "string.uuid",
  user_id: "string",
  property_id: "string",
  start_date: "string.date",
  end_date: "string.date",
  day_price: "number.integer>0",
  total_price: "number.integer>0",
  currency,
});

export const CreateBookingInput = booking.pick("property_id", "start_date", "end_date");
export const UpdateBookingInput = booking.pick("property_id", "start_date", "end_date");
export type Booking = typeof booking.infer;
