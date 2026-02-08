// ===========================================
// Upgrade Notice Component
// ===========================================
// Shows upgrade prompts when users reach plan limits

import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES, PLANS } from '../../utils/constants';

const UpgradeNotice = ({
  type = 'warning',
  feature,
  currentPlan = 'FREE',
  compact = false,
}) => {
  const planIndex = PLANS.findIndex((p) => p.id === currentPlan);
  const nextPlan = PLANS[planIndex + 1];

  const messages = {
    countdowns: {
      title: 'Countdown Limit Reached',
      description: `You've reached the maximum number of countdowns for the ${currentPlan} plan.`,
    },
    views: {
      title: 'Monthly Views Limit Reached',
      description: `You've used all your monthly views for the ${currentPlan} plan.`,
    },
    duration: {
      title: 'Countdown Duration Limited',
      description: `The ${currentPlan} plan limits countdown duration. Upgrade for longer countdowns.`,
    },
    branding: {
      title: 'Remove Branding',
      description: `Remove DojoCountdown branding by upgrading to ${nextPlan?.name || 'a higher'} plan.`,
    },
    customization: {
      title: 'Advanced Customization',
      description: `Advanced style customization is available on ${nextPlan?.name || 'higher'} plans.`,
    },
  };

  const message = messages[feature] || {
    title: 'Upgrade Your Plan',
    description: 'Unlock more features by upgrading your plan.',
  };

  if (compact) {
    return (
      <div className='bg-yellow-50 border-l-4 border-yellow-400 p-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <svg
              className='w-5 h-5 text-yellow-400 mr-2'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                clipRule='evenodd'
              />
            </svg>
            <p className='text-sm font-medium text-yellow-800'>
              {message.title}
            </p>
          </div>
          <Link
            to={ROUTES.DASHBOARD_USAGE}
            className='text-sm font-medium text-yellow-800 hover:text-yellow-900 underline'
          >
            Upgrade
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6 shadow-sm'>
      <div className='flex'>
        <div className='flex-shrink-0'>
          <svg
            className='w-8 h-8 text-yellow-400'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
              clipRule='evenodd'
            />
          </svg>
        </div>
        <div className='ml-4 flex-1'>
          <h3 className='text-lg font-semibold text-gray-900'>
            {message.title}
          </h3>
          <p className='mt-1 text-sm text-gray-600'>{message.description}</p>

          {nextPlan && (
            <div className='mt-4 bg-white rounded-lg p-4 border border-gray-200'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-900'>
                    Upgrade to {nextPlan.name}
                  </p>
                  <p className='text-xs text-gray-500 mt-1'>
                    {nextPlan.description}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='text-2xl font-bold text-gray-900'>
                    ${nextPlan.price}
                    {nextPlan.price > 0 && (
                      <span className='text-sm text-gray-500'>/mo</span>
                    )}
                  </p>
                </div>
              </div>
              <div className='mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600'>
                <div className='flex items-center'>
                  <svg
                    className='w-4 h-4 text-green-500 mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                  {nextPlan.limits.countdowns === Infinity
                    ? 'Unlimited'
                    : nextPlan.limits.countdowns}{' '}
                  countdowns
                </div>
                <div className='flex items-center'>
                  <svg
                    className='w-4 h-4 text-green-500 mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                  {nextPlan.limits.views.toLocaleString()} views/mo
                </div>
                <div className='flex items-center'>
                  <svg
                    className='w-4 h-4 text-green-500 mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                  {nextPlan.limits.maxDays === Infinity
                    ? 'Unlimited'
                    : `${nextPlan.limits.maxDays} days`}{' '}
                  duration
                </div>
                <div className='flex items-center'>
                  <svg
                    className='w-4 h-4 text-green-500 mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Advanced features
                </div>
              </div>
            </div>
          )}

          <div className='mt-4 flex gap-3'>
            <Link
              to={ROUTES.DASHBOARD_USAGE}
              className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors'
            >
              View Plans & Upgrade
              <svg
                className='ml-2 w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </Link>
            <a
              href='mailto:support@dojocountdown.com'
              className='inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors'
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeNotice;
