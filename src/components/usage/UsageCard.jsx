// ===========================================
// Usage Card Component
// ===========================================

import React from "react";

export function UsageCard({ title, value, subtitle, icon, trend }) {
  return (
    <div className='bg-white rounded-lg shadow-sm p-6'>
      <div className='flex items-center justify-between mb-4'>
        <div className='w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600'>
          {icon}
        </div>
        {trend && (
          <span
            className={`text-sm font-medium ${
              trend > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend > 0 ? "+" : ""}
            {trend}%
          </span>
        )}
      </div>
      <h3 className='text-2xl font-bold text-gray-900'>{value}</h3>
      <p className='text-sm text-gray-500'>{title}</p>
      {subtitle && <p className='text-xs text-gray-400 mt-1'>{subtitle}</p>}
    </div>
  );
}

export default UsageCard;
