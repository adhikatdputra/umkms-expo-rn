import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import ToastManager from "toastify-react-native";
import "./global.css";

// TanStack Query imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// Auth Context import
import { AuthProvider } from "@/contexts/AuthContext";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Create QueryClient instance
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Time before data is considered stale
            staleTime: 1000 * 60 * 5, // 5 minutes
            // Time before inactive queries are garbage collected
            gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
            // Retry failed requests
            retry: (failureCount, error: any) => {
              // Don't retry on 4xx errors except 408 (timeout)
              if (
                error?.response?.status >= 400 &&
                error?.response?.status < 500 &&
                error?.response?.status !== 408
              ) {
                return false;
              }
              // Retry up to 3 times for other errors
              return failureCount < 3;
            },
            // Retry delay
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 30000),
            // Refetch on window focus (for web compatibility)
            refetchOnWindowFocus: false,
            // Refetch on reconnect
            refetchOnReconnect: true,
          },
          mutations: {
            // Retry mutations on failure
            retry: (failureCount, error: any) => {
              // Don't retry on client errors (4xx)
              if (
                error?.response?.status >= 400 &&
                error?.response?.status < 500
              ) {
                return false;
              }
              // Retry up to 2 times for server errors
              return failureCount < 2;
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <ToastManager />
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
