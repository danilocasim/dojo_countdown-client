// ===========================================
// Alert Component
// ===========================================
// Notification component for success/error/warning messages.

import React from 'react';

const variants = {
  success: {
    container: 'bg-green-50 border-green-200 text-green-800',
    icon: '✓',
    iconBg: 'bg-green-100 text-green-600',
  },
  error: {
    container: 'bg-red-50 border-red-200 text-red-800',
    icon: '✕',
    iconBg: 'bg-red-100 text-red-600',
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    icon: '!',
    iconBg: 'bg-yellow-100 text-yellow-600',
  },
  info: {
    container: 'bg-blue-50 border-blue-200 text-blue-800',
    icon: 'i',
    iconBg: 'bg-blue-100 text-blue-600',
  },
};

export function Alert({
  children,
  variant = 'info',
  title,
  dismissible = false,
  onDismiss,
  className = '',
}) {
  const styles = variants[variant];

  return (
    <div 
      className={`border rounded-lg p-4 ${styles.container} ${className}`}
      role="alert"
    >
      <div className="flex">
        <div className={`flex-shrink-0 w-6 h-6 rounded-full ${styles.iconBg} flex items-center justify-center text-sm font-bold mr-3`}>
          {styles.icon}
        </div>
        <div className="flex-1">
          {title && (
            <h3 className="font-semibold mb-1">{title}</h3>
          )}
          <div className="text-sm">{children}</div>
        </div>
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600"
            aria-label="Dismiss"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default Alert;
