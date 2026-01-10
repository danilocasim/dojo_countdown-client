// ===========================================
// Design Selector Component
// ===========================================

import React from "react";
import { DESIGN_OPTIONS } from "../../utils/constants";

export function DesignSelector({ value, onChange }) {
  return (
    <div className='space-y-3'>
      <label className='block text-sm font-medium text-gray-700'>
        Design Style
      </label>
      <div className='grid grid-cols-1   md:grid-cols-2 gap-3'>
        {DESIGN_OPTIONS.map((design) => (
          <button
            key={design.id}
            type='button'
            onClick={() => onChange(design.id)}
            className={`relative p-4 border-2 rounded-lg text-center transition-all ${
              value === design.id
                ? "border-primary-500 bg-primary-50 ring-2 ring-primary-200"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <div className='text-2xl mb-2'>{design.preview}</div>
            <div className='font-medium text-sm text-gray-900'>
              {design.name}
            </div>
            <div className='text-xs text-gray-500 mt-1'>
              {design.description}
            </div>
            {value === design.id && (
              <div className='absolute top-2 right-2'>
                <svg
                  className='w-5 h-5 text-primary-500'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DesignSelector;
