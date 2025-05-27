import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./slices/productSlice";
import filtersReducer from "./slices/filterSlice";
import favoritesReducer from "./slices/favouritesSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
