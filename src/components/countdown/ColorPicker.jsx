// ===========================================
// Color Picker Component
// ===========================================

import React from "react";
import { COLOR_PRESETS } from "../../utils/constants";

export function ColorPicker({ label, value, onChange, presets = true }) {

  return (
    <div className='space-y-2'>
      <label className='block text-sm font-medium text-gray-700'>{label}</label>

      {/* Current Color Preview */}
      <div className='flex items-center gap-3'>
        <div
          className='w-10 h-10 rounded-lg border-2 border-gray-300 shadow-inner'
          style={{ backgroundColor: value }}
        />
        <input
          type='text'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className='flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary-500 focus:border-transparent'
          placeholder='#000000'
        />
        <input
          type='color'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className='w-10 h-10 rounded cursor-pointer border-0'
        />
      </div>

      {/* Quick Presets */}
      {presets && (
        <div className='flex flex-wrap gap-2 mt-2'>
          {[
            "#000000",
            "#FFFFFF",
            "#e94560",
            "#3498db",
            "#27ae60",
            "#9b59b6",
            "#f39c12",
            "#1a1a2e",
          ].map((color) => (
            <button
              key={color}
              type='button'
              onClick={() => onChange(color)}
              className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                value === color
                  ? "border-primary-500 ring-2 ring-primary-200"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function ColorPresetSelector({ colors, onSelect }) {
  return (
    <div className='space-y-2'>
      <label className='block text-sm font-medium text-gray-700'>
        Quick Presets
      </label>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
        {COLOR_PRESETS.map((preset, index) => (
          <button
            key={index}
            type='button'
            onClick={() => onSelect(preset)}
            className='flex items-center gap-2 p-2 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-gray-50 transition-colors'
          >
            <div className='flex gap-1'>
              <div
                className='w-4 h-4 rounded'
                style={{ backgroundColor: preset.design }}
              />
              <div
                className='w-4 h-4 rounded'
                style={{ backgroundColor: preset.text }}
              />
              <div
                className='w-4 h-4 rounded border'
                style={{ backgroundColor: preset.backdrop }}
              />
            </div>
            <span className='text-xs text-gray-600'>{preset.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ColorPicker;
