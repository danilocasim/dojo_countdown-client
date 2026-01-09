// ===========================================
// useFormState Hook
// ===========================================
// Manages form field state and validation.

import { useState, useCallback } from "react";

export function useFormState(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === "checkbox" ? checked : value;

      setValues((prev) => ({ ...prev, [name]: newValue }));

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: null }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const setFieldError = useCallback((name, error) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const setMultipleErrors = useCallback((errorMap) => {
    setErrors((prev) => ({ ...prev, ...errorMap }));
    const touchedMap = Object.keys(errorMap).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched((prev) => ({ ...prev, ...touchedMap }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const getValue = useCallback((name) => values[name] || "", [values]);

  const getError = useCallback((name) => errors[name] || null, [errors]);

  const isTouched = useCallback((name) => touched[name] || false, [touched]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldError,
    setMultipleErrors,
    resetForm,
    getValue,
    getError,
    isTouched,
  };
}

export default useFormState;
