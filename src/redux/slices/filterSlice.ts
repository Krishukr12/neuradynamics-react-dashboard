import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    searchTerm: "",
    category: "all",
    // 'price-asc' | 'price-desc'
    sortBy: "default",
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setSearchTerm, setCategory, setSortBy } = filterSlice.actions;
export default filterSlice.reducer;
