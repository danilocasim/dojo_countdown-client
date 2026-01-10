// ===========================================
// Edit Countdown Page
// ===========================================

import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCountdown from "../hooks/useCountdown";
import CountdownForm from "../components/countdown/CountdownForm";
import Spinner from "../components/ui/Spinner";
import Alert from "../components/ui/Alert";
import { ROUTES } from "../utils/constants";

export function CountdownEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    countdown,
    isLoading,
    isSaving,
    error,
    fetchCountdown,
    updateCountdown,
    clearError,
  } = useCountdown();

  useEffect(() => {
    if (id) {
      fetchCountdown(id);
      console.log(fetchCountdown(id));
    }
  }, [id, fetchCountdown]);

  const handleSave = async (formData) => {
    const result = await updateCountdown(id, formData);

    if (result.success) {
      // Refresh countdown data
      fetchCountdown(id);
    }
  };

  if (isLoading) {
    return (
      <div className='p-6 flex items-center justify-center min-h-[400px]'>
        <Spinner size='xl' />
      </div>
    );
  }

  if (!countdown && !isLoading) {
    return (
      <div className='p-6 max-w-6xl mx-auto'>
        <Alert variant='error'>
          Countdown not found or you don't have permission to edit it.
        </Alert>
        <button
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className='mt-4 text-primary-600 hover:text-primary-700'
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className='p-6 max-w-6xl mx-auto'>
      {/* Header */}
      <div className='mb-8'>
        <button
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className='flex items-center text-gray-600 hover:text-gray-900 mb-4'
        >
          <svg
            className='w-5 h-5 mr-1'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
          Back to Dashboard
        </button>
        <h1 className='text-2xl font-bold text-gray-900'>Edit Countdown</h1>
        <p className='text-gray-500'>Update your countdown settings</p>
      </div>

      {/* Form */}
      <CountdownForm
        initialData={countdown}
        onSave={handleSave}
        isSaving={isSaving}
        error={error}
        onClearError={clearError}
      />
    </div>
  );
}

export default CountdownEdit;
