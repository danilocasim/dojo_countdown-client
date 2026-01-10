// ===========================================
// useUsage Hook
// ===========================================

import { useState, useCallback } from "react";
import usageApi from "../api/usage";

export function useUsage() {
  const [usage, setUsage] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsage = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await usageApi.getCurrent();

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to fetch usage");
      }

      const data = await response.json();
      setUsage(data.data);
      return { success: true, data: data.data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchHistory = useCallback(async (months = 6) => {
    try {
      const response = await usageApi.getHistory(months);

      if (!response.ok) {
        return { success: false };
      }

      const data = await response.json();
      setHistory(data.data || []);
      return { success: true, data: data.data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  return {
    usage,
    history,
    isLoading,
    error,
    fetchUsage,
    fetchHistory,
  };
}

export default useUsage;
