"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000, // Avoid immediate refetching on the client
      },
    },
  });
}

let queryClientInstance: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    // On the server, always create a new QueryClient
    return makeQueryClient();
  }
  // On the client, reuse the same instance if available
  if (!queryClientInstance) queryClientInstance = makeQueryClient();
  return queryClientInstance;
}

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
