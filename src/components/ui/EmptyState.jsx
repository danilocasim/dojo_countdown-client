// ===========================================
// Empty State Component
// ===========================================
// Reusable empty state for lists and data views

import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const EmptyState = ({
  icon = 'inbox',
  title = 'No items found',
  description = 'Get started by creating your first item',
  actionLabel,
  actionTo,
  onAction,
  secondaryActionLabel,
  secondaryActionTo,
  onSecondaryAction,
}) => {
  const icons = {
    inbox: (
      <svg
        className='w-16 h-16'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
        />
      </svg>
    ),
    clock: (
      <svg
        className='w-16 h-16'
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
    ),
    chart: (
      <svg
        className='w-16 h-16'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
        />
      </svg>
    ),
    search: (
      <svg
        className='w-16 h-16'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
        />
      </svg>
    ),
    filter: (
      <svg
        className='w-16 h-16'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
        />
      </svg>
    ),
  };

  const iconComponent = typeof icon === 'string' ? icons[icon] : icon;

  return (
    <div className='text-center py-12 px-4'>
      <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 text-gray-400 mb-4'>
        {iconComponent}
      </div>

      <h3 className='text-lg font-semibold text-gray-900 mb-2'>{title}</h3>
      <p className='text-sm text-gray-500 max-w-sm mx-auto mb-6'>
        {description}
      </p>

      <div className='flex flex-col sm:flex-row gap-3 justify-center items-center'>
        {actionLabel &&
          (actionTo ? (
            <Link to={actionTo}>
              <Button variant='primary' size='lg'>
                {actionLabel}
              </Button>
            </Link>
          ) : (
            <Button variant='primary' size='lg' onClick={onAction}>
              {actionLabel}
            </Button>
          ))}

        {secondaryActionLabel &&
          (secondaryActionTo ? (
            <Link to={secondaryActionTo}>
              <Button variant='outline' size='lg'>
                {secondaryActionLabel}
              </Button>
            </Link>
          ) : (
            <Button variant='outline' size='lg' onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          ))}
      </div>
    </div>
  );
};

export default EmptyState;
