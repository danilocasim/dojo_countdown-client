// ===========================================
// useCountdowns Hook
// ===========================================

import { useState, useCallback } from "react";
import countdownsApi from "../api/countdowns";

export function useCountdowns() {
  const [countdowns, setCountdowns] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCountdowns = useCallback(async (params = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await countdownsApi.getAll(params);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to fetch countdowns");
      }

      const data = await response.json();
      setCountdowns(data.data.countdowns || data.data || []);
      return { success: true, data: data.data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const response = await countdownsApi.getStats();

      if (!response.ok) {
        return { success: false };
      }

      const data = await response.json();
      setStats(data.data);
      return { success: true, data: data.data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  const deleteCountdown = useCallback(async (id) => {
    try {
      const response = await countdownsApi.delete(id);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete countdown");
      }

      setCountdowns((prev) => prev.filter((c) => c.id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  return {
    countdowns,
    stats,
    isLoading,
    error,
    fetchCountdowns,
    fetchStats,
    deleteCountdown,
  };
}

export default useCountdowns;
