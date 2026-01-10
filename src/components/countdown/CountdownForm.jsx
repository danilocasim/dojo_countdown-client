// ===========================================
// Countdown Form Component
// ===========================================

import React, { useState, useEffect, useMemo } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Alert from "../ui/Alert";
import DesignSelector from "./DesignSelector";
import ColorPicker, { ColorPresetSelector } from "./ColorPicker";
import TimezoneSelect from "./TimezoneSelect";
import LivePreview from "./LivePreview";
import EmbedCodeGenerator from "./EmbedCodeGenerator";
import { DEFAULT_STYLE_CONFIG } from "../../utils/constants";
import { getUserTimezone } from "../../utils/timezones";

/**
 * Converts a UTC date to a datetime-local input value in a specific timezone.
 *
 * @param {string} utcDateString - UTC date string from database
 * @param {string} timezone - IANA timezone (e.g., "Asia/Manila")
 * @returns {string} datetime-local format: "YYYY-MM-DDTHH:MM"
 */
function utcToLocalInput(utcDateString, timezone) {
  if (!utcDateString) return "";

  try {
    const utcDate = new Date(utcDateString);

    // Format the UTC date in the target timezone
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const parts = formatter.formatToParts(utcDate);
    const values = {};
    parts.forEach((part) => {
      values[part.type] = part.value;
    });

    // Handle midnight edge case (hour might be "24" in some locales)
    const hour = values.hour === "24" ? "00" : values.hour;

    // Return in datetime-local format: YYYY-MM-DDTHH:MM
    return `${values.year}-${values.month}-${values.day}T${hour}:${values.minute}`;
  } catch (error) {
    console.error("Error converting UTC to local:", error);
    return "";
  }
}

/**
 * Converts a datetime-local input value to UTC, interpreting it in a specific timezone.
 * This is the reverse of utcToLocalInput.
 *
 * @param {string} localDateStr - datetime-local value (e.g., "2025-01-15T20:00")
 * @param {string} timezone - IANA timezone (e.g., "Asia/Manila")
 * @returns {string} ISO UTC string
 */
function localInputToUTC(localDateStr, timezone) {
  if (!localDateStr) return null;

  try {
    // Parse the local date string parts
    const [datePart, timePart] = localDateStr.split("T");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute] = (timePart || "00:00").split(":").map(Number);

    // Create a formatter for the target timezone
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    // Start with a UTC guess (same numbers but in UTC)
    let utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));

    // See what this UTC time looks like in the target timezone
    const parts = formatter.formatToParts(utcGuess);
    const values = {};
    parts.forEach((part) => {
      values[part.type] = parseInt(part.value) || 0;
    });

    // Calculate the offset between what we want and what we got
    const guessInTz = new Date(
      values.year,
      values.month - 1,
      values.day,
      values.hour,
      values.minute,
      values.second
    );
    const target = new Date(year, month - 1, day, hour, minute, 0);

    // Offset is how much we need to adjust UTC
    const offsetMs = guessInTz.getTime() - target.getTime();

    // Subtract offset to get correct UTC time
    const utcDate = new Date(utcGuess.getTime() - offsetMs);

    return utcDate.toISOString();
  } catch (error) {
    console.error("Error converting local to UTC:", error);
    return null;
  }
}

export function CountdownForm({
  initialData = null,
  onSave,
  isSaving = false,
  error = null,
  onClearError,
}) {
  const isEditing = !!initialData?.id;

  // Determine initial timezone
  const initialTimezone = initialData?.timezone || getUserTimezone();

  // Form state
  const [title, setTitle] = useState(initialData?.title || "");
  const [timezone, setTimezone] = useState(initialTimezone);

  // Store the display value (local time in selected timezone)
  // On edit, convert UTC endAt to display value using the countdown's timezone
  const [endAt, setEndAt] = useState(() => {
    if (initialData?.endAt) {
      return utcToLocalInput(initialData.endAt, initialTimezone);
    }
    return "";
  });

  const [styleConfig, setStyleConfig] = useState(
    initialData?.styleConfig || { ...DEFAULT_STYLE_CONFIG }
  );

  // Validation
  const [errors, setErrors] = useState({});

  // Preview refresh key
  const [refreshKey, setRefreshKey] = useState(0);

  // Update refresh key when style changes
  useEffect(() => {
    if (isEditing) {
      setRefreshKey((prev) => prev + 1);
    }
  }, [styleConfig, isEditing]);

  // Calculate what UTC will be for preview/validation
  const calculatedUTC = useMemo(() => {
    if (!endAt || !timezone) return null;
    return localInputToUTC(endAt, timezone);
  }, [endAt, timezone]);

  // Show the user what UTC time this translates to
  const utcPreview = useMemo(() => {
    if (!calculatedUTC) return null;
    const date = new Date(calculatedUTC);
    return date.toISOString().replace("T", " ").slice(0, 19) + " UTC";
  }, [calculatedUTC]);

  // Handle style config changes
  const updateStyleConfig = (key, value) => {
    setStyleConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateColor = (colorKey, value) => {
    setStyleConfig((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorKey]: value,
      },
    }));
  };

  const applyColorPreset = (preset) => {
    setStyleConfig((prev) => ({
      ...prev,
      colors: {
        design: preset.design,
        text: preset.text,
        backdrop: preset.backdrop,
      },
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!endAt) {
      newErrors.endAt = "End date is required";
    } else if (calculatedUTC) {
      const endDate = new Date(calculatedUTC);
      if (endDate <= new Date()) {
        newErrors.endAt = "End date must be in the future";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save
  const handleSave = () => {
    if (onClearError) onClearError();

    if (!validateForm()) {
      return;
    }

    // Convert display time to UTC using selected timezone
    const utcEndAt = localInputToUTC(endAt, timezone);

    const formData = {
      title: title.trim(),
      endAt: utcEndAt, // Send as UTC ISO string
      timezone,
      styleConfig,
    };

    console.log("=== SAVE DEBUG ===");
    console.log("Display time:", endAt);
    console.log("Timezone:", timezone);
    console.log("UTC result:", utcEndAt);
    console.log("styleConfig:", JSON.stringify(formData.styleConfig, null, 2));
    console.log("==================");

    onSave(formData);
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
      {/* Left Column - Form */}
      <div className='space-y-6'>
        {error && (
          <Alert variant='error' dismissible onDismiss={onClearError}>
            {error}
          </Alert>
        )}

        {/* Basic Info */}
        <div className='bg-white rounded-lg shadow-sm p-6 space-y-4'>
          <h3 className='text-lg font-semibold text-gray-900'>
            Basic Information
          </h3>

          <Input
            label='Countdown Title'
            name='title'
            value={title}
            error={errors.title}
            touched={!!errors.title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='e.g., Black Friday Sale'
            required
          />

          <div className='space-y-1'>
            <label className='block text-sm font-medium text-gray-700'>
              End Date & Time <span className='text-red-500'>*</span>
            </label>
            <input
              type='datetime-local'
              value={endAt}
              onChange={(e) => setEndAt(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.endAt ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.endAt && (
              <p className='text-sm text-red-600'>{errors.endAt}</p>
            )}
            {/* Show UTC preview */}
            {utcPreview && !errors.endAt && (
              <p className='text-xs text-gray-500'>
                Will be stored as: {utcPreview}
              </p>
            )}
          </div>

          <TimezoneSelect value={timezone} onChange={setTimezone} />

          {/* Info about timezone behavior */}
          <p className='text-xs text-gray-400'>
            The time above is interpreted in the selected timezone. Changing the
            timezone will change when the countdown ends.
          </p>
        </div>

        {/* Design Selection */}
        <div className='bg-white rounded-lg shadow-sm p-6 space-y-4'>
          <h3 className='text-lg font-semibold text-gray-900'>Design</h3>
          <DesignSelector
            value={styleConfig.design}
            onChange={(design) => updateStyleConfig("design", design)}
          />
        </div>

        {/* Colors */}
        <div className='bg-white rounded-lg shadow-sm p-6 space-y-4'>
          <h3 className='text-lg font-semibold text-gray-900'>Colors</h3>

          <ColorPresetSelector
            colors={styleConfig.colors}
            onSelect={applyColorPreset}
          />

          <div className='border-t pt-4 mt-4 space-y-4'>
            <ColorPicker
              label='Design Color'
              value={styleConfig.colors.design}
              onChange={(color) => updateColor("design", color)}
            />
            <ColorPicker
              label='Text Color'
              value={styleConfig.colors.text}
              onChange={(color) => updateColor("text", color)}
            />
            <ColorPicker
              label='Background Color'
              value={styleConfig.colors.backdrop}
              onChange={(color) => updateColor("backdrop", color)}
            />
          </div>

          {/* No Backdrop Option */}
          <label className='flex items-center gap-2 pt-2'>
            <input
              type='checkbox'
              checked={styleConfig.noBackdrop || false}
              onChange={(e) =>
                updateStyleConfig("noBackdrop", e.target.checked)
              }
              className='w-4 h-4 text-primary-500 rounded focus:ring-primary-500'
            />
            <span className='text-sm text-gray-700'>
              Transparent background
            </span>
          </label>
        </div>

        {/* Save Button */}
        <Button
          variant='primary'
          size='lg'
          fullWidth
          loading={isSaving}
          disabled={isSaving}
          onClick={handleSave}
        >
          {isSaving
            ? "Saving..."
            : isEditing
            ? "Update Countdown"
            : "Create Countdown"}
        </Button>
      </div>

      {/* Right Column - Preview */}
      <div className='space-y-6'>
        <div className='bg-white rounded-lg shadow-sm p-6 sticky top-4'>
          <LivePreview
            countdownId={initialData?.id}
            styleConfig={styleConfig}
            refreshKey={refreshKey}
          />
        </div>

        {isEditing && initialData?.id && (
          <div className='bg-white rounded-lg shadow-sm p-6'>
            <EmbedCodeGenerator countdownId={initialData.id} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CountdownForm;
