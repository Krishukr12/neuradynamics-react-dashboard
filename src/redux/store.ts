import { configureStore } from '@reduxjs/toolkit';

import productsReducer from '@redux/slices/productSlice';
import filtersReducer from '@redux/slices/filterSlice';
import favoritesReducer from '@redux/slices/favouritesSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
