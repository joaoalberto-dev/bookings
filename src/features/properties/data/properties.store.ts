import { type } from "arktype";
import { create } from "zustand";

import { type Property, propertyResponse } from "./properties.types";

interface PropertyState {
  properties: Property[];
  isLoading: boolean;
  fetchProperties: (signal?: AbortSignal) => Promise<void>;
}

const usePropertiesStore = create<PropertyState>((set) => ({
  properties: [],
  isLoading: false,
  async fetchProperties(signal) {
    try {
      set({ isLoading: true });

      const response = await fetch("/properties/data.json", { signal });

      if (!response.ok) {
        throw new Error("Failed to load properties");
      }

      const data = propertyResponse(await response.json());

      if (data instanceof type.errors) {
        throw new Error("Invalid Properties");
      }

      set({ properties: data.properties, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      if ((error as Error).name === "AbortError") return;
      throw error;
    }
  },
}));

export const useProperties = () => usePropertiesStore((store) => store.properties);
export const usePropertiesIsLoading = () => usePropertiesStore((store) => store.isLoading);
export const usePropertiesFetch = () => usePropertiesStore((store) => store.fetchProperties);
export const resetPropertiesStore = () => {
  usePropertiesStore.setState({ properties: [], isLoading: false });
};
