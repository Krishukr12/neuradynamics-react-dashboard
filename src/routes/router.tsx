import { Layout } from '@/components/Layout';
import { PageNotFound } from '@/components/PageNotFound';
import { RouteError } from '@/components/RouteError';
import { Favorites } from '@/pages/Favorites';
import { Product } from '@/pages/Product';
import { ProductDetails } from '@/pages/ProductDetails';
import type { RouteObject } from 'react-router';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouteError />,
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
] satisfies RouteObject[];
