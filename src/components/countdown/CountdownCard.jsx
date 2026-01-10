// ===========================================
// Countdown Card Component
// ===========================================

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { renderApi } from "../../api/render";
import Button from "../ui/Button";

export function CountdownCard({ countdown, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(countdown.id);
    setIsDeleting(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isExpired = new Date(countdown.endAt) < new Date();

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow'>
      {/* Preview Image */}
      <div
        className='h-32 bg-gray-100 flex items-center justify-center overflow-hidden'
        style={{
          backgroundColor: countdown.styleConfig?.colors?.backdrop || "#f3f4f6",
        }}
      >
        <img
          src={renderApi.getImageUrl(countdown.id, "gif")}
          alt={countdown.title}
          className='max-w-full max-h-full object-contain'
          loading='lazy'
        />
      </div>

      {/* Content */}
      <div className='p-4'>
        <div className='flex items-start justify-between mb-2'>
          <h3 className='font-semibold text-gray-900 truncate flex-1'>
            {countdown.title}
          </h3>
          <span
            className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
              isExpired
                ? "bg-gray-100 text-gray-600"
                : countdown.status === "ACTIVE"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {isExpired ? "Expired" : countdown.status}
          </span>
        </div>

        <p className='text-sm text-gray-500 mb-3'>
          Ends: {formatDate(countdown.endAt)}
        </p>

        <div className='text-xs text-gray-400 mb-4'>
          {countdown.viewCount || 0} views
        </div>

        {/* Actions */}
        {showDeleteConfirm ? (
          <div className='flex gap-2'>
            <Button
              variant='danger'
              size='sm'
              fullWidth
              loading={isDeleting}
              onClick={handleDelete}
            >
              Confirm Delete
            </Button>
            <Button
              variant='outline'
              size='sm'
              fullWidth
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className='flex gap-2'>
            <Link
              to={`/dashboard/countdowns/${countdown.id}/edit`}
              className='flex-1'
            >
              <Button variant='outline' size='sm' fullWidth>
                Edit
              </Button>
            </Link>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setShowDeleteConfirm(true)}
              className='text-red-600 hover:text-red-700 hover:bg-red-50'
            >
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                />
              </svg>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CountdownCard;
