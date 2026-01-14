import type { Booking } from "./booking.types";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const validateDates = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (isNaN(startDate.getTime())) return "Invalid start date";
  if (isNaN(endDate.getTime())) return "Invalid end date";
  if (endDate <= startDate) return "End date must be after start date";

  return null;
};

const assertValidateDates = (start: string, end: string) => {
  const error = validateDates(start, end);
  if (error) throw new Error(error);
};

export const calculateNights = (start: string, end: string) => {
  assertValidateDates(start, end);

  const startDate = new Date(start);
  const endDate = new Date(end);
  const startUTC = Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate());
  const endUTC = Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate());

  return Math.floor((endUTC - startUTC) / MS_PER_DAY);
};

export const calculateTotalPrice = (start: string, end: string, dayPrice: number) => {
  return calculateNights(start, end) * dayPrice;
};

export const isOverlaping = (existingBookings: Booking[], candidateBooking: Booking) => {
  assertValidateDates(candidateBooking.start_date, candidateBooking.end_date);

  const candidateStartDate = new Date(candidateBooking.start_date);
  const candidateEndDate = new Date(candidateBooking.end_date);

  for (const existingBooking of existingBookings) {
    const existingStartDate = new Date(existingBooking.start_date);
    const existingEndDate = new Date(existingBooking.end_date);

    if (candidateStartDate < existingEndDate && candidateEndDate > existingStartDate) {
      return true;
    }
  }

  return false;
};
