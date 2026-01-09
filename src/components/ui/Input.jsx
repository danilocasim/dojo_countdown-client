// ===========================================
// Input Component
// ===========================================
// Reusable form input with label and error states.

import React, { forwardRef } from 'react';

export const Input = forwardRef(({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  error,
  touched,
  disabled = false,
  required = false,
  className = '',
  onChange,
  onBlur,
  ...props
}, ref) => {
  const showError = error && touched;
  
  const inputClasses = [
    'w-full px-4 py-3 border rounded-lg transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:border-transparent',
    showError
      ? 'border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:ring-primary-500',
    disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
    className,
  ].join(' ');

  return (
    <div className="mb-4">
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClasses}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={showError}
        aria-describedby={showError ? `${name}-error` : undefined}
        {...props}
      />
      {showError && (
        <p 
          id={`${name}-error`} 
          className="text-sm text-red-600 mt-1"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
