import React from 'react';

import DashboardPage from '../pages/Dashboard/Dashboard';
import DeliveriesPage from '../pages/Deliveries/Deliveries';
import LoginPage from '../pages/Login/Login';
import SignUpPage from '../pages/Signup/SignUp';

export enum routeNames {
  LOGIN = '/login',
  SIGNUP = '/signup',
  MAIN = '/',
  DELIVERIES = '/deliveries',
}

interface IRoute {
  name: string;
  path: string;
  element: React.FC;
  icon?: string;
}

export const authRoutes: IRoute[] = [
  {
    name: 'Вход',
    path: routeNames.LOGIN,
    element: LoginPage,
  },
  {
    name: 'Регистрация',
    path: routeNames.SIGNUP,
    element: SignUpPage,
  },
];

export const privateRoutes: IRoute[] = [
  {
    name: 'Главная',
    path: routeNames.MAIN,
    element: DashboardPage,
    icon: 'home',
  },
  {
    name: 'Поставки',
    path: routeNames.DELIVERIES,
    element: DeliveriesPage,
    icon: 'box',
  },
];
