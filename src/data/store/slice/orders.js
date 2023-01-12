import { createSlice } from "@reduxjs/toolkit";

export const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    ordersData: null,
  },
  reducers: {
    setOrdersData: (state, action) => {
      state.ordersData = action.payload;
    },
  },
});

export const { setOrdersData } = ordersSlice.actions;

export default ordersSlice.reducer;
