// ===========================================
// Card Component
// ===========================================
// Reusable card container component.

import React from 'react';

export function Card({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  rounded = 'lg',
  ...props
}) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
  };

  const classes = [
    'bg-white',
    paddingClasses[padding],
    shadowClasses[shadow],
    roundedClasses[rounded],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export default Card;
