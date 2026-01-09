// ===========================================
// Login Page
// ===========================================
// User authentication page.

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/layout/Navbar';
import Card from '../components/ui/Card';
import LoginForm from '../components/forms/LoginForm';
import { ROUTES } from '../utils/constants';

export function Login() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to={ROUTES.HOME} className="inline-flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">D</span>
              </div>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back
            </h1>
            <p className="mt-2 text-gray-600">
              Sign in to your account to continue
            </p>
          </div>

          <Card padding="lg" shadow="lg">
            <LoginForm />
          </Card>
        </div>
      </main>
    </div>
  );
}

export default Login;
