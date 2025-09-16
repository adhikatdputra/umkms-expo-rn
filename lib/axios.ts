// src/services/api.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError, AxiosResponse } from "axios";
import { router } from 'expo-router';
import { Alert } from "react-native";

// Types
interface ApiError {
  message: string;
  status?: number;
}

// Constants
const API_BASE_URL = "https://remit.umkms.com";
const TOKEN_KEY = "authToken";
const CLIENT_ID = "dcbe7aa2-9fe2-4f68-a8bd-1e7a7b381306";

// Create axios instance
const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
instance.interceptors.request.use(
  async (config) => {
    try {
      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem(TOKEN_KEY);

      // Set headers directly on the config object
      config.headers.set("Accept", "application/json");
      config.headers.set("X-CLIENT-ID", CLIENT_ID);
      if (token) {
        config.headers.set("X-ACCESS-TOKEN", token);
      }

      return config;
    } catch (error) {
      console.error("Error getting token from AsyncStorage:", error);

      // Set headers directly on the config object
      config.headers.set("Accept", "application/json");
      config.headers.set("X-CLIENT-ID", CLIENT_ID);

      return config;
    }
  },
  (error) => Promise.reject(error)
);

// Response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const { response } = error;

    if (response) {
      const status = response.status;
      const data = response.data as ApiError;

      // Handle unauthorized (401) or invalid credentials
      if (
        status === 401 ||
        data?.message === "Invalid credentials" ||
        data?.message === "Unauthorized"
      ) {
        try {
          // Clear all auth data from AsyncStorage
          await AsyncStorage.multiRemove([
            TOKEN_KEY,
            "userData",
            "isAuthenticated",
          ]);

          // Show alert to user
          Alert.alert(
            "Session Expired",
            "Your session has expired. Please login again.",
            [{ text: "OK" }]
          );
          router.push("/");
          // Note: Navigation should be handled in your app's navigation context
          // You can use a navigation service or global state management
        } catch (storageError) {
          console.error("Error clearing AsyncStorage:", storageError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
