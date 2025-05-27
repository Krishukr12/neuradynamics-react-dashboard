import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "../features/products/productSlice";
import filtersReducer from "../features/filters/filterSlice";
import favoritesReducer from "../features/favourites/favouritesSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
