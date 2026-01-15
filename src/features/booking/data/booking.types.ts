import { type } from "arktype";

import { currency } from "@/types";

export const booking = type({
  id: "string.uuid",
  user_id: "string",
  property_id: "string",
  start_date: "string.date.iso",
  end_date: "string.date.iso",
  day_price: "number.integer>0",
  currency,
}).narrow((data, ctx) => {
  const start = new Date(data.start_date);
  const end = new Date(data.end_date);

  if (end <= start) {
    return ctx.mustBe("a booking where end_date is bigger than start_date");
  }

  return true;
});

export type Booking = typeof booking.infer;
