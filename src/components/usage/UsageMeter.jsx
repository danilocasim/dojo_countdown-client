// ===========================================
// Usage Meter Component
// ===========================================

import React from "react";

export function UsageMeter({ used, limit, label, showPercentage = true }) {
  const percentage = limit > 0 ? Math.min((used / limit) * 100, 100) : 0;

  const getColorClass = () => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-yellow-500";
    return "bg-primary-500";
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between text-sm'>
        <span className='text-gray-600'>{label}</span>
        <span className='font-medium text-gray-900'>
          {formatNumber(used)} / {formatNumber(limit)}
        </span>
      </div>
      <div className='h-3 bg-gray-200 rounded-full overflow-hidden'>
        <div
          className={`h-full rounded-full transition-all duration-500 ${getColorClass()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <p className='text-xs text-gray-500 text-right'>
          {percentage.toFixed(1)}% used
        </p>
      )}
    </div>
  );
}

export default UsageMeter;
