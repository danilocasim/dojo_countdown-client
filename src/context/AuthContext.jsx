// ===========================================
// Authentication Context
// ===========================================
// Provides authentication state throughout the app.

import React, { createContext, useState, useEffect, useCallback } from "react";
import { clearTokens, getAccessToken } from "../api/client";
import useFetchUser from "../hooks/useFetchUser";
import useLogout from "../hooks/useLogout";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { fetchUser } = useFetchUser();
  const { logout: logoutApi } = useLogout();

  // Initialize auth state on mount
  const initializeAuth = useCallback(async () => {
    const token = getAccessToken();
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);

        // Verify token is still valid
        const result = await fetchUser();
        if (result.success) {
          setUser(result.user);
          localStorage.setItem("user", JSON.stringify(result.user));
        } else {
          // Token invalid - clear state
          clearTokens();
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        clearTokens();
        setUser(null);
        setIsAuthenticated(false);
      }
    }

    setIsLoading(false);
  }, [fetchUser]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Called after successful login/signup
  const setAuthUser = useCallback((userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  // Logout handler
  const logout = useCallback(async () => {
    await logoutApi();
    setUser(null);
    setIsAuthenticated(false);
  }, [logoutApi]);

  const value = {
    user,
    isLoading,
    isAuthenticated,
    setAuthUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
