// ===========================================
// App Component
// ===========================================

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Public Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Dashboard Pages
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import CountdownNew from "./pages/CountdownNew";
import CountdownEdit from "./pages/CountdownEdit";
import Usage from "./pages/Usage";

import { ROUTES } from "./utils/constants";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.HOME} element={<Landing />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />

          {/* Dashboard Routes (Protected) */}
          <Route path='/dashboard' element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='countdowns/new' element={<CountdownNew />} />
            <Route path='countdowns/:id/edit' element={<CountdownEdit />} />
            <Route path='usage' element={<Usage />} />
          </Route>

          {/* Catch all */}
          <Route path='*' element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
