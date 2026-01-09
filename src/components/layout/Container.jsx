// ===========================================
// Container Component
// ===========================================
// Page container with max-width and padding.

import React from 'react';

export function Container({ 
  children, 
  className = '',
  size = 'default' 
}) {
  const sizes = {
    small: 'max-w-3xl',
    default: 'max-w-7xl',
    large: 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  return (
    <div className={`${sizes[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export default Container;
