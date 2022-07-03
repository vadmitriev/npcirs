import React from 'react';
import {
  Navigate,
  Routes,
  Route,
  Outlet,
  useLocation,
} from 'react-router-dom';

import { MainLayout } from '../layouts';

import { NotFoundPage } from '../pages';

import { useAuth } from '../hooks/useAuth';
import { authRoutes, publicRoutes } from './routes';

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
        {authRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
        <Route element={<RequireAuth />}>
          {publicRoutes.map((route) => (
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
