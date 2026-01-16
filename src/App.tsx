import "./ui/styles/global.css";

import { useState } from "react";

import { type Property } from "@/features/properties/data/properties.types";
import { PropertiesList } from "@/features/properties/ui/property-list/properties-list";
import { Header } from "@/ui/components/header/header";

import { useClearCurrentBooking, useUpdateCurrrentBooking } from "./features/booking/data/booking.store";
import { Booking } from "./features/booking/ui/booking/booking";

export const App = () => {
  const updateCurrentBooking = useUpdateCurrrentBooking();
  const clearCurrentBooking = useClearCurrentBooking();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const onPropertySelect = (property: Property) => {
    updateCurrentBooking({ property_id: property.id });
    setSelectedProperty(property);
  };

  const onBookingCancel = () => {
    clearCurrentBooking();
    setSelectedProperty(null);
  };

  return (
    <main>
      <Header title="Hostfully" />
      <PropertiesList onPropertySelect={onPropertySelect} />
      {selectedProperty?.id && <Booking property={selectedProperty} onBookingCancel={onBookingCancel} />}
    </main>
  );
};
