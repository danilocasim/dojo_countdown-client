// ===========================================
// Usage Page
// ===========================================

import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import useUsage from "../hooks/useUsage";
import UsageMeter from "../components/usage/UsageMeter";
import UsageCard from "../components/usage/UsageCard";
import Spinner from "../components/ui/Spinner";
import { PLANS } from "../utils/constants";

export function Usage() {
  const { user } = useAuth();
  const { usage, isLoading, fetchUsage, fetchHistory } = useUsage();

  useEffect(() => {
    fetchUsage();
    fetchHistory(6);
  }, [fetchUsage, fetchHistory]);

  const currentPlan = PLANS.find((p) => p.id === user?.plan) || PLANS[0];

  if (isLoading && !usage) {
    return (
      <div className='p-6 flex items-center justify-center min-h-[400px]'>
        <Spinner size='xl' />
      </div>
    );
  }

  return (
    <div className='p-6 max-w-5xl mx-auto'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900'>Usage & Billing</h1>
        <p className='text-gray-500'>Monitor your usage and manage your plan</p>
      </div>

      {/* Current Plan */}
      <div className='bg-white rounded-lg shadow-sm p-6 mb-6'>
        <div className='flex items-center justify-between mb-4'>
          <div>
            <h2 className='text-lg font-semibold text-gray-900'>
              Current Plan
            </h2>
            <p className='text-gray-500'>{currentPlan.description}</p>
          </div>
          <div className='text-right'>
            <p className='text-3xl font-bold text-gray-900'>
              ${currentPlan.price}
              {currentPlan.price > 0 && (
                <span className='text-lg text-gray-500'>/mo</span>
              )}
            </p>
            <span className='inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium'>
              {currentPlan.name}
            </span>
          </div>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t'>
          <div>
            <p className='text-sm text-gray-500'>Countdowns</p>
            <p className='font-semibold'>
              {currentPlan.limits.countdowns === Infinity
                ? "Unlimited"
                : currentPlan.limits.countdowns}
            </p>
          </div>
          <div>
            <p className='text-sm text-gray-500'>Monthly Views</p>
            <p className='font-semibold'>
              {currentPlan.limits.views.toLocaleString()}
            </p>
          </div>
          <div>
            <p className='text-sm text-gray-500'>Max Duration</p>
            <p className='font-semibold'>
              {currentPlan.limits.maxDays === Infinity
                ? "Unlimited"
                : `${currentPlan.limits.maxDays} days`}
            </p>
          </div>
          <div>
            <p className='text-sm text-gray-500'>Branding</p>
            <p className='font-semibold'>
              {currentPlan.limitations.includes("DojoCountdown branding")
                ? "Included"
                : "Removable"}
            </p>
          </div>
        </div>
      </div>

      {/* Usage Stats */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
        <UsageCard
          title='Views This Month'
          value={usage?.views?.used?.toLocaleString() || "0"}
          subtitle={`${
            usage?.views?.remaining?.toLocaleString() || "0"
          } remaining`}
          icon={
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
              />
            </svg>
          }
        />
        <UsageCard
          title='Days Remaining'
          value={usage?.period?.daysRemaining || "0"}
          subtitle={`Resets on ${usage?.period?.label || "next month"}`}
          icon={
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
          }
        />
      </div>

      {/* Usage Meter */}
      <div className='bg-white rounded-lg shadow-sm p-6 mb-6'>
        <h2 className='text-lg font-semibold text-gray-900 mb-4'>
          Monthly Usage
        </h2>
        <UsageMeter
          used={usage?.views?.used || 0}
          limit={usage?.views?.limit || currentPlan.limits.views}
          label='Views'
        />

        {usage?.status === "warning" && (
          <div className='mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg'>
            <p className='text-sm text-yellow-800'>
              ⚠️ You're approaching your monthly limit. Consider upgrading your
              plan.
            </p>
          </div>
        )}

        {usage?.status === "exceeded" && (
          <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
            <p className='text-sm text-red-800'>
              🚫 You've exceeded your monthly limit. Upgrade to continue using
              countdown timers.
            </p>
          </div>
        )}
      </div>

      {/* Upgrade CTA */}
      {currentPlan.id !== "ENTERPRISE" && (
        <div className='bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-white'>
          <h3 className='text-xl font-semibold mb-2'>Need more?</h3>
          <p className='text-primary-100 mb-4'>
            Upgrade your plan to get more countdowns, views, and premium
            features.
          </p>
          <button className='px-6 py-2 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors'>
            View Plans
          </button>
        </div>
      )}
    </div>
  );
}

export default Usage;
