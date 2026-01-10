// ===========================================
// Live Preview Component
// ===========================================

import React, { useState, useEffect } from "react";
import { renderApi } from "../../api/render";
import useDebounce from "../../hooks/useDebounce";
import Spinner from "../ui/Spinner";

export function LivePreview({ countdownId, styleConfig, refreshKey }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // Debounce the refresh key to avoid excessive reloads
  const debouncedKey = useDebounce(refreshKey, 800);

  useEffect(() => {
    if (countdownId) {
      setIsLoading(true);
      setError(false);
      // Add cache buster with debounced key
      const url =
        renderApi.getPreviewUrl(countdownId, "gif") + `&k=${debouncedKey}`;
      setImageUrl(url);
    }
  }, [countdownId, debouncedKey]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setError(true);
  };

  if (!countdownId) {
    return (
      <div className='bg-gray-100 rounded-lg p-8 text-center'>
        <div className='text-gray-400 mb-2'>
          <svg
            className='w-16 h-16 mx-auto'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
            />
          </svg>
        </div>
        <p className='text-gray-500'>Save countdown to see preview</p>
      </div>
    );
  }

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <label className='block text-sm font-medium text-gray-700'>
          Live Preview
        </label>
        {isLoading && <Spinner size='sm' />}
      </div>

      <div
        className='relative bg-gray-100 rounded-lg overflow-hidden min-h-[150px] flex items-center justify-center'
        style={{ backgroundColor: styleConfig?.colors?.backdrop || "#f3f4f6" }}
      >
        {error ? (
          <div className='text-center p-4'>
            <p className='text-red-500 text-sm'>Failed to load preview</p>
            <button
              onClick={() =>
                setImageUrl(renderApi.getPreviewUrl(countdownId, "gif"))
              }
              className='text-primary-500 text-sm mt-2 hover:underline'
            >
              Retry
            </button>
          </div>
        ) : (
          <img
            key={imageUrl}
            src={imageUrl}
            alt='Countdown Preview'
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`max-w-full h-auto transition-opacity ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
          />
        )}

        {isLoading && !error && (
          <div className='absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75'>
            <Spinner size='lg' />
          </div>
        )}
      </div>

      <p className='text-xs text-gray-500 text-center'>
        This is exactly how your countdown will appear when embedded
      </p>
    </div>
  );
}

export default LivePreview;
