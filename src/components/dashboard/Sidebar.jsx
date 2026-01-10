// ===========================================
// Sidebar Component
// ===========================================

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../utils/constants";

const navItems = [
  {
    name: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: (
      <svg
        className='w-5 h-5'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
        />
      </svg>
    ),
  },
  {
    name: "Create Countdown",
    path: ROUTES.DASHBOARD_NEW,
    icon: (
      <svg
        className='w-5 h-5'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M12 4v16m8-8H4'
        />
      </svg>
    ),
  },
  {
    name: "Usage",
    path: ROUTES.DASHBOARD_USAGE,
    icon: (
      <svg
        className='w-5 h-5'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
        />
      </svg>
    ),
  },
];

export function Sidebar({ onClose }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.HOME);
  };

  return (
    <div className='flex flex-col h-full bg-dark-800 text-white w-64'>
      {/* Logo */}
      <div className='flex items-center justify-between h-16 px-4 border-b border-dark-700'>
        <div className='flex items-center'>
          <div className='w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center mr-2'>
            <span className='font-bold text-lg'>D</span>
          </div>
          <span className='font-bold text-lg'>DojoCountdown</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className='lg:hidden p-1 hover:bg-dark-700 rounded'
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
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className='flex-1 px-2 py-4 space-y-1 overflow-y-auto'>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === ROUTES.DASHBOARD}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary-500 text-white"
                  : "text-gray-300 hover:bg-dark-700 hover:text-white"
              }`
            }
          >
            {item.icon}
            <span className='ml-3'>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* User & Logout */}
      <div className='p-4 border-t border-dark-700'>
        <div className='flex items-center mb-4'>
          <div className='w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center'>
            <span className='font-semibold text-sm'>
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          <div className='ml-3 overflow-hidden'>
            <p className='text-sm font-medium truncate'>
              {user?.name || "User"}
            </p>
            <p className='text-xs text-gray-400 truncate'>{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className='flex items-center w-full px-4 py-2 text-gray-300 hover:bg-dark-700 hover:text-white rounded-lg transition-colors'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
            />
          </svg>
          <span className='ml-3'>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
