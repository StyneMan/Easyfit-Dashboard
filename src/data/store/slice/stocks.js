import { createSlice } from "@reduxjs/toolkit";

export const stocksSlice = createSlice({
  name: "stocks",
  initialState: {
    stocksData: null,
  },
  reducers: {
    setStocksData: (state, action) => {
      state.stocksData = action.payload;
    },
  },
});

export const { setStocksData } = stocksSlice.actions;

export default stocksSlice.reducer;
