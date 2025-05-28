import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { useEffect } from 'react';
import { fetchProducts } from '../redux/slices/productSlice';

export const Layout = () => {
  const { status } = useAppSelector(state => state.products);

  const dispatch = useAppDispatch();
  const count = useAppSelector(state => state.favorites.items.length);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);
  return (
    <div>
      <Navbar favoritesCount={count} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
