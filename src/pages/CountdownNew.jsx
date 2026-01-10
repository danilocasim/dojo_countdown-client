// ===========================================
// Create Countdown Page
// ===========================================

import React from "react";
import { useNavigate } from "react-router-dom";
import useCountdown from "../hooks/useCountdown";
import CountdownForm from "../components/countdown/CountdownForm";
import { ROUTES } from "../utils/constants";

export function CountdownNew() {
  const navigate = useNavigate();
  const { createCountdown, isSaving, error, clearError } = useCountdown();

  const handleSave = async (formData) => {
    const result = await createCountdown(formData);

    if (result.success) {
      // Navigate to edit page to show preview and embed codes
      navigate(`/dashboard/countdowns/${result.data.id}/edit`);
    }
  };

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
        <h1 className='text-2xl font-bold text-gray-900'>
          Create New Countdown
        </h1>
        <p className='text-gray-500'>Configure your countdown timer settings</p>
      </div>

      {/* Form */}
      <CountdownForm
        onSave={handleSave}
        isSaving={isSaving}
        error={error}
        onClearError={clearError}
      />
    </div>
  );
}

export default CountdownNew;
