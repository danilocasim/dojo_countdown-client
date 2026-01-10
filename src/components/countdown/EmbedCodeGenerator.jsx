// ===========================================
// Embed Code Generator Component
// ===========================================

import React, { useState } from "react";
import { renderApi } from "../../api/render";
import useClipboard from "../../hooks/useClipboard";
import Button from "../ui/Button";

const EMBED_TYPES = [
  { id: "html", name: "HTML", description: "For websites and email templates" },
  { id: "markdown", name: "Markdown", description: "For GitHub, Notion, etc." },
  { id: "url", name: "URL Only", description: "Direct image link" },
  { id: "bbcode", name: "BBCode", description: "For forums" },
];

export function EmbedCodeGenerator({ countdownId }) {
  const [activeType, setActiveType] = useState("html");
  const { copied, copy } = useClipboard();

  if (!countdownId) {
    return null;
  }

  const embedCodes = renderApi.getEmbedCodes(countdownId);
  const currentCode = embedCodes[activeType];

  const handleCopy = () => {
    copy(currentCode);
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <label className='block text-sm font-medium text-gray-700'>
          Embed Code
        </label>
      </div>

      {/* Type Selector */}
      <div className='flex flex-wrap gap-2'>
        {EMBED_TYPES.map((type) => (
          <button
            key={type.id}
            type='button'
            onClick={() => setActiveType(type.id)}
            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
              activeType === type.id
                ? "bg-primary-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {type.name}
          </button>
        ))}
      </div>

      {/* Code Display */}
      <div className='relative'>
        <pre className='bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto'>
          <code>{currentCode}</code>
        </pre>
        <Button
          variant={copied ? "primary" : "secondary"}
          size='sm'
          onClick={handleCopy}
          className='absolute top-2 right-2'
        >
          {copied ? (
            <>
              <svg
                className='w-4 h-4 mr-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg
                className='w-4 h-4 mr-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
                />
              </svg>
              Copy
            </>
          )}
        </Button>
      </div>

      {/* Usage Hint */}
      <p className='text-xs text-gray-500'>
        {EMBED_TYPES.find((t) => t.id === activeType)?.description}
      </p>
    </div>
  );
}

export default EmbedCodeGenerator;
