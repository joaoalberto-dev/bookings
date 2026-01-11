import { useEffect } from "react";

export const useAsync = (asyncFunction: (signal: AbortSignal) => Promise<void>): void => {
  useEffect(() => {
    const controller = new AbortController();

    void asyncFunction(controller.signal);

    return () => {
      controller.abort();
    };
  }, [asyncFunction]);
};
