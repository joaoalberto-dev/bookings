import type { Booking } from "./booking.types";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const validateDates = (start: Date, end: Date) => {
  if (!(start instanceof Date) || isNaN(start.getTime())) {
    throw new Error("Invalid start date");
  }
  if (!(end instanceof Date) || isNaN(end.getTime())) {
    throw new Error("Invalid end date");
  }

  const startUTC = Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
  const endUTC = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());

  if (endUTC <= startUTC) {
    throw new Error("End date must be after start date");
  }

  return endUTC > startUTC;
};

export const calculateNights = (start: Date, end: Date) => {
  validateDates(start, end);

  const startDate = Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
  const endDate = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());

  return Math.floor((endDate - startDate) / MS_PER_DAY);
};

export const calculateTotalPrice = (start: Date, end: Date, dayPrice: number) => {
  return calculateNights(start, end) * dayPrice;
};

export const isOverlaping = (existingBookings: Booking[], candidateBooking: Booking) => {
  const candidateStartDate = new Date(candidateBooking.start_date);
  const candidateEndDate = new Date(candidateBooking.end_date);

  validateDates(candidateStartDate, candidateEndDate);

  for (const existingBooking of existingBookings) {
    const existingStartDate = new Date(existingBooking.start_date);
    const existingEndDate = new Date(existingBooking.end_date);

    if (
      (candidateStartDate >= existingStartDate && candidateStartDate <= existingEndDate) ||
      (candidateEndDate >= existingStartDate && candidateEndDate <= existingEndDate) ||
      (candidateStartDate <= existingStartDate && candidateEndDate >= existingEndDate)
    ) {
      return true;
    }
  }

  return false;
};
