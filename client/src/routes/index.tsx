import React from 'react';
import {
  Navigate,
  Routes,
  Route,
  Outlet,
  useLocation,
} from 'react-router-dom';

import { MainLayout } from '../layouts';

import { LoginPage, NotFoundPage, SignUpPage } from '../pages';

import { useAuth } from '../hooks/useAuth';
import { privateRoutes, routeNames } from './routes';

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
          {privateRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
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
