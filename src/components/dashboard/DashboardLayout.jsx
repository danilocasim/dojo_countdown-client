// ===========================================
// Dashboard Layout Component
// ===========================================

import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "./Sidebar";
import Spinner from "../ui/Spinner";

export function DashboardLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <Spinner size='xl' />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return (
    <div className='min-h-screen bg-gray-50 flex'>
      {/* Desktop Sidebar */}
      <div className='hidden lg:flex lg:flex-shrink-0'>
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className='fixed inset-0 z-40 lg:hidden'>
          <div
            className='fixed inset-0 bg-black bg-opacity-50'
            onClick={() => setSidebarOpen(false)}
          />
          <div className='fixed inset-y-0 left-0 z-50'>
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className='flex-1 flex flex-col min-w-0'>
        {/* Mobile Header */}
        <header className='lg:hidden bg-white border-b border-gray-200 px-4 h-16 flex items-center'>
          <button
            onClick={() => setSidebarOpen(true)}
            className='p-2 rounded-md text-gray-600 hover:bg-gray-100'
          >
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
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
          <div className='ml-4 flex items-center'>
            <div className='w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center mr-2'>
              <span className='text-white font-bold'>D</span>
            </div>
            <span className='font-bold text-gray-900'>DojoCountdown</span>
          </div>
        </header>

        {/* Page Content */}
        <main className='flex-1 overflow-y-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
