// ===========================================
// Dashboard Page
// ===========================================

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useCountdowns from "../hooks/useCountdowns";
import useUsage from "../hooks/useUsage";
import CountdownList from "../components/countdown/CountdownList";
import UsageMeter from "../components/usage/UsageMeter";
import UsageCard from "../components/usage/UsageCard";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import EmptyState from "../components/ui/EmptyState";
import UpgradeNotice from "../components/ui/UpgradeNotice";
import { ROUTES, PLANS } from "../utils/constants";

export function Dashboard() {
  const { user } = useAuth();
  const { countdowns, isLoading, error, fetchCountdowns, deleteCountdown } =
    useCountdowns();
  const { usage, fetchUsage } = useUsage();

  useEffect(() => {
    fetchCountdowns();
    fetchUsage();
  }, [fetchCountdowns, fetchUsage]);

  const currentPlan = PLANS.find((p) => p.id === user?.plan) || PLANS[0];

  const handleDelete = async (id) => {
    const result = await deleteCountdown(id);
    if (result.success) {
      fetchCountdowns();
      fetchUsage();
    }
  };

  // Check if user is approaching limits
  const activeCountdownCount =
    countdowns?.filter((c) => c.status === "ACTIVE").length || 0;
  const isApproachingCountdownLimit =
    currentPlan.limits.countdowns !== Infinity &&
    activeCountdownCount >= currentPlan.limits.countdowns * 0.8;

  const isApproachingViewLimit =
    usage?.views?.limit && usage.views.used >= usage.views.limit * 0.8;

  const hasExceededCountdownLimit =
    currentPlan.limits.countdowns !== Infinity &&
    activeCountdownCount >= currentPlan.limits.countdowns;

  const hasExceededViewLimit =
    usage?.views?.limit && usage.views.used >= usage.views.limit;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.name}</p>
        </div>
        <Link to={ROUTES.DASHBOARD_NEW} className="mt-4 sm:mt-0">
          <Button variant="primary">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Countdown
          </Button>
        </Link>
      </div>

      {/* Usage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <UsageCard
          title="Active Countdowns"
          value={countdowns?.filter((c) => c.status === "ACTIVE").length || 0}
          subtitle={`${
            currentPlan.limits.countdowns === Infinity
              ? "Unlimited"
              : currentPlan.limits.countdowns
          } allowed`}
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
        <UsageCard
          title="Monthly Views"
          value={usage?.views?.used?.toLocaleString() || "0"}
          subtitle={`${
            usage?.views?.remaining?.toLocaleString() ||
            currentPlan.limits.views.toLocaleString()
          } remaining`}
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          }
        />
        <UsageCard
          title="Current Plan"
          value={currentPlan.name}
          subtitle={
            currentPlan.price === 0
              ? "Free forever"
              : `$${currentPlan.price}/month`
          }
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          }
        />
      </div>

      {/* Upgrade Notices */}
      {hasExceededCountdownLimit && (
        <div className="mb-6">
          <UpgradeNotice feature="countdowns" currentPlan={user?.plan} />
        </div>
      )}

      {hasExceededViewLimit && (
        <div className="mb-6">
          <UpgradeNotice feature="views" currentPlan={user?.plan} />
        </div>
      )}

      {/* Warning for approaching limits */}
      {!hasExceededCountdownLimit && isApproachingCountdownLimit && (
        <div className="mb-6">
          <UpgradeNotice
            feature="countdowns"
            currentPlan={user?.plan}
            compact
          />
        </div>
      )}

      {!hasExceededViewLimit && isApproachingViewLimit && (
        <div className="mb-6">
          <UpgradeNotice feature="views" currentPlan={user?.plan} compact />
        </div>
      )}

      {/* Usage Meter */}
      {usage && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Monthly Usage
          </h2>
          <UsageMeter
            used={usage.views?.used || 0}
            limit={usage.views?.limit || currentPlan.limits.views}
            label="Views this month"
          />
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="error" className="mb-6">
          {error}
        </Alert>
      )}

      {/* Countdowns List */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Your Countdowns
        </h2>
        {!isLoading && countdowns && countdowns.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm">
            <EmptyState
              icon="clock"
              title="No countdowns yet"
              description="Create your first countdown timer to get started. Embed it in emails, websites, or share it anywhere!"
              actionLabel="Create First Countdown"
              actionTo={ROUTES.DASHBOARD_NEW}
              secondaryActionLabel="View Documentation"
              secondaryActionTo="#"
            />
          </div>
        ) : (
          <CountdownList
            countdowns={countdowns}
            isLoading={isLoading}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
