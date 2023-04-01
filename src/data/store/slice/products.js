import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    productsData: null,
    featuredMealData: null,
  },
  reducers: {
    setProductsData: (state, action) => {
      state.productsData = action.payload;
    },
    setFeaturedMeal: (state, action) => {
      state.featuredMealData = action.payload;
    },
  },
});

export const { setProductsData, setFeaturedMeal } = productSlice.actions;

export default productSlice.reducer;
