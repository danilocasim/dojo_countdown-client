// ===========================================
// useFetchUser Hook
// ===========================================
// Fetches current user data from API.

import { useState, useCallback } from "react";
import { api } from "../api/client";

export function useFetchUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get("/api/v1/users/me");

      if (!response.ok) {
        setIsLoading(false);
        return { success: false, user: null };
      }

      const data = await response.json();
      setIsLoading(false);
      return { success: true, user: data.data };
    } catch (err) {
      setError("Failed to fetch user data");
      setIsLoading(false);
      return { success: false, user: null };
    }
  }, []);

  return {
    fetchUser,
    isLoading,
    error,
  };
}

export default useFetchUser;
