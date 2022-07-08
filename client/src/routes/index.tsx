import React from 'react';
import {
  Navigate,
  Routes,
  Route,
  Outlet,
  useLocation,
} from 'react-router-dom';

import MainLayout from '../layouts/main/MainLayout';

import NotFoundPage from '../pages/NotFound/NotFound';

import LoginPage from '../pages/Login/Login';
import SignUpPage from '../pages/Signup/Signup';

import DashboardPage from '../pages/Dashboard/Dashboard';
import DeliveriesPage from '../pages/Deliveries/Deliveries';

import { useAuth } from '../hooks/useAuth';
import { authRoutes, routeNames } from './routes';

function RequireAuth() {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isAuth) {
    return (
      <Navigate to={routeNames.LOGIN} state={{ from: location }} />
    );
  }

  if (auth.isAuth && location.pathname === routeNames.LOGIN) {
    return (
      <Navigate to={routeNames.MAIN} state={{ from: location }} />
    );
  }
  return <Outlet />;
}

const Router = () => {
  return (
    <Routes>
      <Route path={routeNames.LOGIN} element={<LoginPage />} />
      <Route path={routeNames.SIGNUP} element={<SignUpPage />} />
      <Route element={<RequireAuth />}>
        <Route element={<MainLayout />}>
          <Route path={routeNames.MAIN} element={<DashboardPage />} />
          <Route
            path={routeNames.DELIVERIES}
            element={<DeliveriesPage />}
          />
          <Route
            path={`/${routeNames.DELIVERIES}/:id`}
            element={<DeliveriesPage />}
          />
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
