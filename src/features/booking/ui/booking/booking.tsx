import { type } from "arktype";
import { useCallback, useState } from "react";

import type { Property } from "@/features/properties/data/properties.types";

import { useCreateBooking, useCurrentBooking } from "../../data/booking.store";
import { booking } from "../../data/booking.types";
import { BookingCalendar } from "../booking-calendar/booking-calendar";
import { BookingModal } from "../booking-modal/booking-modal";
import { BookingModalFooter } from "../booking-modal-footer/booking-modal-footer";
import { BookingModalHeader } from "../booking-modal-header/booking-modal-header";
import { BookingModalSummary } from "../booking-modal-summary/booking-modal-summary";

interface BookingProps {
  property: Property | null;
  onBookingCancel: () => void;
}

export const Booking = ({ property, onBookingCancel }: BookingProps) => {
  const currentBooking = useCurrentBooking();
  const createBooking = useCreateBooking();
  const [showCalendar, setShowCalendar] = useState(false);

  const onClose = useCallback(() => {
    onBookingCancel();
    setShowCalendar(false);
  }, [onBookingCancel]);

  const onSaveDates = useCallback(() => {
    setShowCalendar(false);
  }, []);

  const onReserveBooking = useCallback(() => {
    const newBooking = booking({
      ...currentBooking,
      id: crypto.randomUUID(),
      user_id: "current-user",
      currency: "USD",
      day_price: property?.day_price,
    });

    if (newBooking instanceof type.errors) {
      return;
    }

    createBooking(newBooking);
    onClose();
  }, [property?.day_price, currentBooking, createBooking, onClose]);

  if (!property) return null;

  const confirmText = showCalendar ? "Save" : "Reserve";
  const hasBookingDates = Boolean(currentBooking?.start_date && currentBooking.end_date);

  return (
    <BookingModal onClose={onClose}>
      <BookingModalHeader cover={property.cover} name={property.name} />
      {showCalendar ? (
        <BookingCalendar />
      ) : (
        <BookingModalSummary
          property={property}
          onDateChange={() => {
            setShowCalendar(true);
          }}
        />
      )}
      <BookingModalFooter
        property={property}
        confirmText={confirmText}
        onConfirm={showCalendar ? onSaveDates : onReserveBooking}
        disabled={!hasBookingDates && !showCalendar}
      />
    </BookingModal>
  );
};
