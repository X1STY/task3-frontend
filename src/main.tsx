import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';

import DrivePage from './pages/DrivePage';
import StartPage from './pages/StartPage';
import NonAuthRoute from './routes/NonAuthRoute';
import PrivateRoute from './routes/PrivateRoute';

import './assets/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NonAuthRoute />,
    children: [
      {
        path: '/',
        element: <StartPage />
      }
    ]
  },
  {
    path: '/drive',
    element: <PrivateRoute />,
    children: [
      {
        path: '/drive',
        element: <DrivePage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
