// ===========================================
// useLogin Hook
// ===========================================
// Handles login API call with loading and error states.

import { useState, useCallback } from "react";
import { api, setTokens } from "../api/client";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post(
        "/api/v1/auth/login",
        { email, password },
        { skipAuth: true }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || "Login failed. Please try again.";
        setError(errorMessage);
        setIsLoading(false);
        return { success: false, error: errorMessage };
      }

      // Store tokens
      const { accessToken, refreshToken, user } = data.data;
      setTokens(accessToken, refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      setIsLoading(false);
      return { success: true, user };
    } catch (err) {
      const errorMessage = "Network error. Please check your connection.";
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, error: errorMessage };
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    login,
    isLoading,
    error,
    clearError,
  };
}

export default useLogin;
