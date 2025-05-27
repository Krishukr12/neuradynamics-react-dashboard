import { createSlice } from "@reduxjs/toolkit";
import type { FavouritesState } from "../../types";

const initialState: FavouritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter((id) => id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
