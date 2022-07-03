import React from 'react';
import { Navigate } from 'react-router-dom';
import { DashboardPage, LoginPage, SignUpPage } from '../pages';

export const routeNames = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  MAIN: '/',
  DASHBOARD: '/',
};

export const authRoutes = [
  {
    name: 'Войти',
    path: routeNames.LOGIN,
    element: <LoginPage />,
  },
  {
    name: 'Регистрация',
    path: routeNames.SIGNUP,
    element: <SignUpPage />,
  },
];

export const publicRoutes = [
  {
    name: 'Главная',
    path: routeNames.MAIN,
    element: <Navigate to={routeNames.MAIN} />,
    icon: 'x-fa fa-home',
  },
  {
    name: 'Главная',
    path: routeNames.DASHBOARD,
    element: <DashboardPage />,
    icon: 'x-fa fa-home',
  },
];
