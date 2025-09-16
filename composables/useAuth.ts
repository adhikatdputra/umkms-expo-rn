import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "authToken";

export const useAuth = {
    // Save token to AsyncStorage
    saveToken: async (token: string): Promise<void> => {
      try {
        await AsyncStorage.setItem(TOKEN_KEY, token);
      } catch (error) {
        console.error("Error saving token:", error);
      }
    },
  
    // Get token from AsyncStorage
    getToken: async (): Promise<string | null> => {
      try {
        return await AsyncStorage.getItem(TOKEN_KEY);
      } catch (error) {
        console.error("Error getting token:", error);
        return null;
      }
    },
  
    // Remove token from AsyncStorage
    removeToken: async (): Promise<void> => {
      try {
        await AsyncStorage.removeItem(TOKEN_KEY);
      } catch (error) {
        console.error("Error removing token:", error);
      }
    },
  
    // Clear all auth data
    clearAuthData: async (): Promise<void> => {
      try {
        await AsyncStorage.multiRemove([
          TOKEN_KEY,
          "userData",
          "isAuthenticated",
        ]);
      } catch (error) {
        console.error("Error clearing auth data:", error);
      }
    },
  };