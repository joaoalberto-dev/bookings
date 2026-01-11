import { renderHook } from "@testing-library/react";

import { useAsync } from "./use-async";

describe("useAsync", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should call the async function on mount", () => {
    const asyncFn = vi.fn();

    renderHook(() => {
      useAsync(asyncFn);
    });

    expect(asyncFn).toHaveBeenCalledTimes(1);
  });

  test("should pass an AbortSignal to the async function", () => {
    const asyncFn = vi.fn();

    renderHook(() => {
      useAsync(asyncFn);
    });

    expect(asyncFn).toHaveBeenCalledWith(expect.any(AbortSignal));
  });

  test("should abort when unmounted", () => {
    const asyncFn = vi.fn();

    const { unmount } = renderHook(() => {
      useAsync(asyncFn);
    });

    const signal = asyncFn.mock.calls[0][0] as AbortSignal;
    expect(signal.aborted).toBe(false);

    unmount();

    expect(signal.aborted).toBe(true);
  });

  test("should re-run when async function reference changes", () => {
    const asyncFn1 = vi.fn();
    const asyncFn2 = vi.fn();

    const { rerender } = renderHook(
      ({ fn }) => {
        useAsync(fn);
      },
      {
        initialProps: { fn: asyncFn1 },
      },
    );

    expect(asyncFn1).toHaveBeenCalledTimes(1);
    expect(asyncFn2).toHaveBeenCalledTimes(0);

    rerender({ fn: asyncFn2 });

    expect(asyncFn1).toHaveBeenCalledTimes(1);
    expect(asyncFn2).toHaveBeenCalledTimes(1);
  });

  test("should abort previous call when async function changes", () => {
    const asyncFn1 = vi.fn();
    const asyncFn2 = vi.fn();

    const { rerender } = renderHook(
      ({ fn }) => {
        useAsync(fn);
      },
      {
        initialProps: { fn: asyncFn1 },
      },
    );

    const firstSignal = asyncFn1.mock.calls[0][0] as AbortSignal;
    expect(firstSignal.aborted).toBe(false);

    rerender({ fn: asyncFn2 });

    expect(firstSignal.aborted).toBe(true);
  });

  test("should not re-run when function reference is stable", () => {
    const asyncFn = vi.fn();

    const { rerender } = renderHook(() => {
      useAsync(asyncFn);
    });

    expect(asyncFn).toHaveBeenCalledTimes(1);

    rerender();

    expect(asyncFn).toHaveBeenCalledTimes(1);
  });

  test("should not throw when async function rejects after abort", () => {
    const asyncFn = vi.fn().mockImplementation(async (signal: AbortSignal) => {
      await new Promise((_, reject) => {
        signal.addEventListener("abort", () => {
          reject(new DOMException("Aborted", "AbortError"));
        });
      });
    });

    const { unmount } = renderHook(() => {
      useAsync(asyncFn);
    });

    unmount();
  });
});
