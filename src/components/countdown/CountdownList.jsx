// ===========================================
// Countdown List Component
// ===========================================

import React from "react";
import { Link } from "react-router-dom";
import CountdownCard from "./CountdownCard";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import { ROUTES } from "../../utils/constants";

export function CountdownList({ countdowns, isLoading, onDelete }) {
  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <Spinner size='xl' />
      </div>
    );
  }

  if (!countdowns || countdowns.length === 0) {
    return (
      <div className='text-center py-12 bg-white rounded-lg shadow-sm'>
        <div className='text-gray-400 mb-4'>
          <svg
            className='w-16 h-16 mx-auto'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>
        <h3 className='text-lg font-medium text-gray-900 mb-2'>
          No countdowns yet
        </h3>
        <p className='text-gray-500 mb-6'>
          Create your first countdown to get started
        </p>
        <Link to={ROUTES.DASHBOARD_NEW}>
          <Button variant='primary'>Create Countdown</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {countdowns.map((countdown) => (
        <CountdownCard
          key={countdown.id}
          countdown={countdown}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default CountdownList;
