import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { store } from './redux/store.ts';
import { Layout } from './components/Layout.tsx';
import { Product } from './pages/Product.tsx';
import { Favorites } from './pages/Favorites.tsx';
import { ProductDetails } from './pages/ProductDetails.tsx';
import { PageNotFound } from './components/PageNotFound.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Product />,
      },
      {
        path: '/favorites',
        element: <Favorites />,
      },
      {
        path: '/product/:id',
        element: <ProductDetails />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
