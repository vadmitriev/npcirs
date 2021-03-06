import React from 'react';

import DashboardPage from '../pages/Dashboard/Dashboard';
import DeliveriesPage from '../pages/Deliveries/Deliveries';

export enum routeNames {
  LOGIN = '/login',
  SIGNUP = '/signup',
  MAIN = '/',
  DELIVERIES = '/deliveries',
  ERROR = '/error',
}

interface IRoute {
  name: string;
  path: string;
  element: React.FC;
  icon?: string;
}

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
