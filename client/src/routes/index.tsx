import React from 'react';
import {
  Navigate,
  Routes,
  Route,
  Outlet,
  useLocation,
} from 'react-router-dom';

import { MainLayout } from '../layouts';

import {
  DashboardPage,
  LoginPage,
  SignUpPage,
  NotFoundPage,
} from '../pages';

import { useAuth } from '../hooks/useAuth';

function RequireAuth() {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <Outlet />;
}

const Router = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Route>
      <Route
        path="*"
        element={<NotFoundPage text="Страница не найдена" />}
      />
    </Routes>
  );
};

export default Router;
