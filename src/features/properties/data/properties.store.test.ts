import { act, renderHook } from "@testing-library/react";

import { mockFetch, mockFetchErrorThrow, mockFetchWithError, mockFetchWithResolve } from "@/tests/helpers";

import { resetPropertiesStore, useProperties, usePropertiesFetch, usePropertiesIsLoading } from "./properties.store";
import { type Property } from "./properties.types";

describe("useProperties", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.resetAllMocks();
    act(() => {
      resetPropertiesStore();
    });
  });

  test("useProperties should start with empty state", () => {
    const { result } = renderHook(() => useProperties());

    expect(result.current.length).toBe(0);
  });

  test("should fetch and store properties", async () => {
    mockFetch(mockData);

    const { result: fetchResult } = renderHook(() => usePropertiesFetch());
    const { result: properties } = renderHook(() => useProperties());

    await act(async () => {
      await fetchResult.current();
    });

    expect(properties.current).toEqual(mockData.properties);
  });
});

describe("usePropertiesIsLoading", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.resetAllMocks();
    act(() => {
      resetPropertiesStore();
    });
  });

  test("should start with false", () => {
    const { result } = renderHook(() => usePropertiesIsLoading());

    expect(result.current).toBe(false);
  });

  test("should change to true after fetch starts", async () => {
    const { resolve } = mockFetchWithResolve(mockData);
    const { result: fetchResult } = renderHook(() => usePropertiesFetch());
    const { result: loadingResult } = renderHook(() => usePropertiesIsLoading());

    let fetchPromise: Promise<void>;

    act(() => {
      fetchPromise = fetchResult.current();
    });

    expect(loadingResult.current).toBe(true);

    await act(async () => {
      resolve();
      await fetchPromise;
    });
  });

  test("should change to false after fetch finish", async () => {
    mockFetch(mockData);

    const { result: fetchResult } = renderHook(() => usePropertiesFetch());
    const { result: loading } = renderHook(() => usePropertiesIsLoading());

    await act(async () => {
      await fetchResult.current();
    });

    expect(loading.current).toBe(false);
  });

  test("should change to false after fetch fails", async () => {
    mockFetchWithError();

    const { result: fetchResult } = renderHook(() => usePropertiesFetch());
    const { result: loading } = renderHook(() => usePropertiesIsLoading());

    await act(async () => {
      await expect(fetchResult.current()).rejects.toThrowError("Failed to load properties");
    });

    expect(loading.current).toBe(false);
  });
});

describe("usePropertiesFetch", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.resetAllMocks();
    act(() => {
      resetPropertiesStore();
    });
  });

  test("should throw error when response is not ok", async () => {
    mockFetchWithError();

    const { result } = renderHook(() => usePropertiesFetch());

    await expect(result.current()).rejects.toThrow("Failed to load properties");
  });

  test("should throw error when fetch fails", async () => {
    mockFetchErrorThrow(new Error("Network error"));

    const { result } = renderHook(() => usePropertiesFetch());

    await expect(result.current()).rejects.toThrow("Network error");
  });

  test("should silently handle abort errors", async () => {
    const abortError = new Error("Aborted");
    abortError.name = "AbortError";
    mockFetchErrorThrow(abortError);

    const { result } = renderHook(() => usePropertiesFetch());

    await expect(result.current()).resolves.toBeUndefined();
  });

  test("should pass abort signal to fetch", async () => {
    mockFetch({
      properties: [],
    });

    const { result } = renderHook(() => usePropertiesFetch());
    const controller = new AbortController();

    await result.current(controller.signal);

    expect(fetch).toHaveBeenCalledWith("/properties/data.json", {
      signal: controller.signal,
    });
  });

  test("should call correct endpoint", async () => {
    mockFetch({ properties: [] });

    const { result } = renderHook(() => usePropertiesFetch());

    await result.current();

    expect(fetch).toHaveBeenCalledWith("/properties/data.json", {
      signal: undefined,
    });
  });

  test("should throw error when response data is invalid", async () => {
    mockFetch({ properties: "not an array" });

    const { result } = renderHook(() => usePropertiesFetch());

    await expect(result.current()).rejects.toThrow("Invalid Properties");
  });
});

// Mock
const mockData: Record<"properties", Property[]> = {
  properties: [
    {
      id: "0f1d9e7a-7c3e-4e5a-9b3f-9b9e0c8d1a01",
      name: "Modern loft in downtown",
      description:
        "A stylish modern loft located in the heart of downtown, offering open spaces, high ceilings, and contemporary design. Ideal for business travelers or couples seeking convenience and comfort.\n\nAmenities:\n\nOpen-plan living area\n\nHigh-speed Wi-Fi\n\nFully equipped kitchen\n\nSmart TV\n\nWorkspace with desk and chair",
      cover: "/properties/images/0f1d9e7a-7c3e-4e5a-9b3f-9b9e0c8d1a01.png",
      day_price: 18000,
      currency: "USD",
      location: {
        city: "New York",
        country: "United States",
      },
    },
    {
      id: "1a2b3c4d-1111-4f2a-9d2e-2e1f9a0b0002",
      name: "Cozy mountain cabin",
      description:
        "A cozy wooden cabin surrounded by nature, perfect for a quiet getaway. Warm interiors and scenic views create a peaceful retreat year-round.\n\nAmenities:\n\nFireplace\n\nMountain views\n\nEquipped kitchen\n\nPrivate balcony\n\nHeating system",
      cover: "/properties/images/1a2b3c4d-1111-4f2a-9d2e-2e1f9a0b0002.png",
      day_price: 22000,
      currency: "USD",
      location: {
        city: "New York",
        country: "United States",
      },
    },
  ],
};
