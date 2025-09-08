/**
 * Main Application Entry Point - Swiggy Clone
 * 
 * This file sets up the entire React application with routing, state management,
 * lazy loading, and context providers. It serves as the root component that
 * orchestrates all major application features.
 * 
 * Key Features:
 * - React Router for client-side routing
 * - Redux store for global state management  
 * - React Context for user authentication
 * - Lazy loading for performance optimization
 * - Error boundaries for graceful error handling
 * - Accessibility compliance throughout
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import RestaurantLander from './src/components/RestaurntLander/RestaurantLander';
import { ErrorPage } from './src/components/ErrorPage';
import NavBar from './src/components/NavBar/NavBar';
import { RestaurantDetails } from './src/components/Restaurant/RestaurantDetails';
import { Suspense, lazy, useContext, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { UserContext } from './src/common/utils/UserContext';
import { Cart } from './src/components/Cart';

// Create root element for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Lazy-loaded components for code splitting and performance optimization
const Grocery = lazy(() => import('./src/components/Grocery'));
const Contact = lazy(() => import('./src/components/Contact'));

const AppLayout = () => {
  const { loggedInUser } = useContext(UserContext);

  const [userName, setUserName] = useState(loggedInUser);

  useEffect(() => {
    const data = { loggedInUser: 'Bane' };

    setUserName(data.loggedInUser);
  }, []);

  return (
    <UserContext.Provider
      value={{
        loggedInUser: userName,
        setUserName,
      }}
    >
      <Provider store={store}>
        <NavBar />

        <Outlet />
      </Provider>
    </UserContext.Provider>
  );
};

const routerConfig = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <RestaurantLander />,
      },
      {
        path: '/home',
        element: <RestaurantLander />,
      },

      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/grocery',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: '/restaurant/:id',
        element: <RestaurantDetails />,
      },
      {
        path: '/contact',
        element: (
          <Suspense fallback={<h1>Contacts loading....</h1>}>
            <Contact />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

root.render(<RouterProvider router={routerConfig}></RouterProvider>);
