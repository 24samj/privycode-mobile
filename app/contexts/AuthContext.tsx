// contexts/AuthContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import { useToast } from "./ToastContext";
import { fetchUserData } from "@/src/api";
import { storeToken } from "@/src/utils";

WebBrowser.maybeCompleteAuthSession();

interface User {
  github_username: string;
  email: string;
}

interface AuthError {
  status?: number;
  message?: string;
}

type AuthContextType = {
  token: string | null;
  logout: () => Promise<void>;
  isAuthLoading: boolean;
  user: User | null;
  setToken: (token: string) => void;
  login: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_STORAGE_KEY = "authToken";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { pushToast } = useToast();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const logout = useCallback(async () => {
    try {
      await SecureStore.setItemAsync(TOKEN_STORAGE_KEY, "");
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error("Failed to logout:", error);
      // Still clear local state even if storage fails
      setToken(null);
      setUser(null);
    }
  }, []);

  const getUserData = useCallback(async () => {
    try {
      const data = await fetchUserData();
      setUser(data);
    } catch (error) {
      const authError = error as AuthError;
      console.error("Failed to fetch user data:", authError);

      // Handle 401 errors by logging out
      if (authError.status === 401) {
        // Call logout directly to avoid dependency issues
        try {
          await SecureStore.setItemAsync(TOKEN_STORAGE_KEY, "");
          setToken(null);
          setUser(null);
        } catch (logoutError) {
          console.error("Failed to logout:", logoutError);
          setToken(null);
          setUser(null);
        }
        pushToast({
          title: "Session expired",
          description: "Please login again",
        });
      } else {
        pushToast({
          title: "Error",
          description: "Failed to load user data",
        });
      }
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  const login = useCallback(async () => {
    const AUTH_URL = `${process.env.EXPO_PUBLIC_API_BASE_URL}/github/login?mobile=true`;
    const REDIRECT_URI = process.env.EXPO_PUBLIC_REDIRECT_URI;

    if (!AUTH_URL || !REDIRECT_URI) {
      console.error("Missing environment variables for authentication");
      pushToast({
        title: "Configuration Error",
        description: "Authentication is not properly configured",
      });
      return;
    }

    try {
      const result = await WebBrowser.openAuthSessionAsync(
        AUTH_URL,
        REDIRECT_URI,
      );

      if (result.type === "success" && result.url) {
        const url = new URL(result.url);
        const authToken = url.searchParams.get("token");

        if (authToken) {
          setToken(authToken);
          await storeToken(authToken);
        } else {
          pushToast({
            title: "Login Failed",
            description: "No authentication token received",
          });
        }
      } else if (result.type === "cancel") {
        // User cancelled the login - no need to show error
        console.log("User cancelled login");
      } else {
        pushToast({
          title: "Login Failed",
          description: "Authentication was not successful",
        });
      }
    } catch (error) {
      console.error("Authentication error:", error);
      pushToast({
        title: "Login Error",
        description: "An unexpected error occurred during login",
      });
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  // Initialize auth state from storage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync(TOKEN_STORAGE_KEY);
        if (storedToken && storedToken.trim()) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Failed to load stored token:", error);
      } finally {
        setIsAuthLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Fetch user data when token changes
  useEffect(() => {
    if (token) {
      getUserData();
    } else {
      setIsAuthLoading(false);
    }
  }, [token, getUserData]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({ token, login, logout, isAuthLoading, user, setToken }),
    [token, login, logout, isAuthLoading, user, setToken],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
