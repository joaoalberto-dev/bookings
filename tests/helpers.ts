import { vi } from "vitest";

export const mockFetch = (data: unknown) => {
  vi.mocked(fetch).mockResolvedValueOnce({
    ok: true,
    json: async () => await data,
  } as Response);
};

export const mockFetchWithError = (status = 500) => {
  vi.mocked(fetch).mockResolvedValueOnce({
    ok: false,
    status: status,
  } as Response);
};

export const mockFetchErrorThrow = (error?: Error) => {
  vi.mocked(fetch).mockRejectedValueOnce(error);
};

export const mockFetchWithResolve = () => {
  let resolve: (response: Partial<Response>) => void;

  const pendingPromise = new Promise<Response>((res) => {
    resolve = res as typeof resolve;
  });

  vi.mocked(fetch).mockReturnValueOnce(pendingPromise);

  return {
    resolve: (
      response: Partial<Response> = {
        ok: true,
        // eslint-disable-next-line @typescript-eslint/require-await -- Tests only
        json: async () => {
          return {};
        },
      },
    ) => {
      resolve(response as Response);
    },
  };
};
