import type { Product } from './../types/product.types';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import {
  clearSearchFilterSort,
  setCategory,
  setSearchTerm,
  setSortBy,
} from '../redux/slices/filterSlice';
import { useEffect } from 'react';

export const useSearchFilterSort = (data: Product[]) => {
  const dispatch = useAppDispatch();

  const { searchTerm, category, sortBy } = useAppSelector(state => state.filters);

  const categories = [...new Set(data.map(p => p.category))];
  const filteredProducts = data
    .filter(
      p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (category ? p.category === category : true)
    )
    .sort((a, b) => (sortBy === 'price-asc' ? a.price - b.price : b.price - a.price));

  const handleSearch = (value: string) => {
    dispatch(setSearchTerm(value));
  };
  const handleCategoryChange = (value: string) => {
    dispatch(setCategory(value));
  };

  const handleSortChange = (value: string) => {
    dispatch(setSortBy(value));
  };

  useEffect(() => {
    dispatch(clearSearchFilterSort());
    console.log('running');
  }, [dispatch]);

  return {
    categories,
    filteredProducts,
    handleSearch,
    handleCategoryChange,
    handleSortChange,
  };
};
