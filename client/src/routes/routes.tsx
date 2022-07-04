import React from 'react';
import { Navigate } from 'react-router-dom';
import { DashboardPage, DeliveriesPage } from '../pages';

// import DashboardPage from '../pages/Dashboard/Dashboard';
// import DeliveriesPage from '../pages/Deliveries/Deliveries';

export const routeNames = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  MAIN: '/',
  DELIVERIES: '/deliveries',
};

export const privateRoutes = [
  {
    name: 'Главная',
    path: routeNames.MAIN,
    element: <DashboardPage />,
    icon: 'home',
  },
  {
    name: 'Поставки',
    path: routeNames.DELIVERIES,
    element: <DeliveriesPage />,
    icon: 'box',
  },
];
