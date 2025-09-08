import React from 'react';
import ReactDOM from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import RestaurantLander from './src/components/RestaurntLander/RestaurantLander';
// import Contact from "./src/components/Contact";
import { ErrorPage } from './src/components/ErrorPage';
import NavBar from './src/components/NavBar/NavBar';
import { RestaurantDetails } from './src/components/Restaurant/RestaurantDetails';
// import { Lazy } from "./src/components/Lazy";
import { Suspense, lazy, useContext, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { UserContext } from './src/common/utils/UserContext';
import { Cart } from './src/components/Cart';

const root = ReactDOM.createRoot(document.getElementById('root'));

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
