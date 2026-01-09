// ===========================================
// useLogout Hook
// ===========================================
// Handles logout API call.

import { useState, useCallback } from "react";
import { api, clearTokens } from "../api/client";

export function useLogout() {
  const [isLoading, setIsLoading] = useState(false);

  const logout = useCallback(async () => {
    setIsLoading(true);

    try {
      await api.post("/api/v1/auth/logout");
    } catch (err) {
      // Ignore logout errors - still clear local state
      console.error("Logout error:", err);
    } finally {
      clearTokens();
      setIsLoading(false);
    }
  }, []);

  return {
    logout,
    isLoading,
  };
}

export default useLogout;
