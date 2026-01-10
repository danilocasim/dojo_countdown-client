// ===========================================
// useCountdown Hook
// ===========================================

import { useState, useCallback } from "react";
import countdownsApi from "../api/countdowns";

export function useCountdown() {
  const [countdown, setCountdown] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const fetchCountdown = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await countdownsApi.getById(id);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to fetch countdown");
      }

      const data = await response.json();
      setCountdown(data.data);
      return { success: true, data: data.data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createCountdown = useCallback(async (formData) => {
    setIsSaving(true);
    setError(null);

    try {
      const response = await countdownsApi.create(formData);
      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || "Failed to create countdown";
        setError(errorMessage);
        return {
          success: false,
          error: errorMessage,
          validationErrors: data.errors,
        };
      }

      setCountdown(data.data);
      return { success: true, data: data.data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsSaving(false);
    }
  }, []);

  const updateCountdown = useCallback(async (id, formData) => {
    setIsSaving(true);
    setError(null);

    try {
      const response = await countdownsApi.update(id, formData);
      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || "Failed to update countdown";
        setError(errorMessage);
        return {
          success: false,
          error: errorMessage,
          validationErrors: data.errors,
        };
      }

      console.log(data);
      setCountdown(data.data);
      return { success: true, data: data.data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsSaving(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    countdown,
    isLoading,
    isSaving,
    error,
    fetchCountdown,
    createCountdown,
    updateCountdown,
    clearError,
    setCountdown,
  };
}

export default useCountdown;
