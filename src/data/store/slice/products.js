import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    productsData: null,
  },
  reducers: {
    setProductsData: (state, action) => {
      state.productsData = action.payload;
    },
  },
});

export const { setProductsData } = productSlice.actions;

export default productSlice.reducer;
