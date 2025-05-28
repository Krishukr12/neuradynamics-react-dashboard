import { createSlice } from "@reduxjs/toolkit";
import type { FavouritesState } from "../../types";
import {
  loadFromLocalStorage,
  LOCAL_STORAGE_KEYS,
  saveToLocalStorage,
} from "../../utils/localStorage";

const persistedItems = loadFromLocalStorage(LOCAL_STORAGE_KEYS.FAVORITES);

const initialState: FavouritesState = {
  items: persistedItems ?? [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
        saveToLocalStorage(LOCAL_STORAGE_KEYS.FAVORITES, state.items);
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter((id) => id !== action.payload);
      saveToLocalStorage(LOCAL_STORAGE_KEYS.FAVORITES, state.items);
    },
    clearFavorites: (state) => {
      state.items = [];
      saveToLocalStorage(LOCAL_STORAGE_KEYS.FAVORITES, []);
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
