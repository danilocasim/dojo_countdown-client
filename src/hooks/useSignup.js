// ===========================================
// useSignup Hook
// ===========================================
// Handles signup API call with loading and error states.

import { useState, useCallback } from "react";
import { api, setTokens } from "../api/client";

export function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = useCallback(async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post(
        "/api/v1/auth/signup",
        { name, email, password },
        { skipAuth: true }
      );

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors array
        if (data.errors && Array.isArray(data.errors)) {
          const errorMessage = data.errors.map((e) => e.msg).join(". ");
          setError(errorMessage);
          setIsLoading(false);
          return {
            success: false,
            error: errorMessage,
            validationErrors: data.errors,
          };
        }

        const errorMessage = data.message || "Signup failed. Please try again.";
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
    signup,
    isLoading,
    error,
    clearError,
  };
}

export default useSignup;
