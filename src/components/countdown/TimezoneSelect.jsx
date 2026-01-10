// ===========================================
// Timezone Select Component
// ===========================================

import React from "react";
import { COMMON_TIMEZONES, formatTimezoneOffset } from "../../utils/timezones";

export function TimezoneSelect({ value, onChange }) {
  return (
    <div className='space-y-1'>
      <label className='block text-sm font-medium text-gray-700'>
        Timezone
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white'
      >
        {COMMON_TIMEZONES.map((tz) => (
          <option key={tz.value} value={tz.value}>
            {tz.label} ({formatTimezoneOffset(tz.value)})
          </option>
        ))}
      </select>
      <p className='text-xs text-gray-500'>
        Select the timezone for your countdown end time
      </p>
    </div>
  );
}

export default TimezoneSelect;
