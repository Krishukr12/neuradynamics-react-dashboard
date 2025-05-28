import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product, ProductsState } from '../../types';

export const fetchProducts = createAsyncThunk<Product[]>('products/fetch', async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  return await res.json();
});

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'something went wrong';
      });
  },
});

export default productSlice.reducer;
