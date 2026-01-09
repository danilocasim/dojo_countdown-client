// ===========================================
// App Component
// ===========================================
// Main application component with routing.

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ROUTES } from './utils/constants';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<Landing />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
          <Route path={ROUTES.DASHBOARD} element={<DashboardPlaceholder />} />
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

function DashboardPlaceholder() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center mx-auto mb-6">
          <span className="text-white font-bold text-3xl">D</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Dashboard Coming Soon
        </h1>
        <p className="text-gray-600 mb-6">
          You have successfully logged in! The dashboard will be implemented in Phase 7.
        </p>
        <a
          href={ROUTES.HOME}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
}

export default App;
