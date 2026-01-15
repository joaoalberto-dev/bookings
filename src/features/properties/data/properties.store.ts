import { create } from "zustand";

import data from "./mock/data.json";
import { type Property } from "./properties.types";

interface PropertyState {
  properties: Property[];
  getPropertyById: (id: string) => Property | undefined;
}

const usePropertiesStore = create<PropertyState>((_, get) => ({
  properties: data.properties as Property[],
  getPropertyById(id) {
    return get().properties.find((p) => p.id === id);
  },
}));

export const useProperties = () => usePropertiesStore((store) => store.properties);
export const useProperty = (id: string) => usePropertiesStore((store) => store.getPropertyById(id));
