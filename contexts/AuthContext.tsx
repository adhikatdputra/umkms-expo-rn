import { useAuth } from '@/composables/useAuth';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// * Define the shape of our auth context
interface AuthContextType {
  authToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

// * Create the context with undefined as default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// * AuthProvider component props
interface AuthProviderProps {
  children: ReactNode;
}

// * AuthProvider component that wraps the app
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // * Computed value for authentication status
  const isAuthenticated = !!authToken;

  // * Login function - saves token and updates state
  const login = async (token: string): Promise<void> => {
    try {
      await useAuth.saveToken(token);
      setAuthToken(token);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  // * Logout function - removes token and updates state
  const logout = async (): Promise<void> => {
    try {
      await useAuth.clearAuthData();
      setAuthToken(null);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  // * Check authentication status on app start
  const checkAuthStatus = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const token = await useAuth.getToken();
      setAuthToken(token);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setAuthToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  // * Check auth status when component mounts
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // * Context value object
  const value: AuthContextType = {
    authToken,
    isLoading,
    isAuthenticated,
    login,
    logout,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// * Custom hook to use auth context
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  // * Throw error if hook is used outside of AuthProvider
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  
  return context;
};
