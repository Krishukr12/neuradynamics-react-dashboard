import { createSlice } from '@reduxjs/toolkit';
interface FilterState {
  searchTerm: string;
  category: string;
  sortBy: string;
}
const initialState: FilterState = {
  searchTerm: '',
  category: '',
  sortBy: 'price-asc',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
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
    clearSearchFilterSort: state => {
      state.category = '';
      state.searchTerm = '';
      state.sortBy = 'price-asc';
    },
  },
});

export const { setSearchTerm, setCategory, setSortBy, clearSearchFilterSort } = filterSlice.actions;
export default filterSlice.reducer;
