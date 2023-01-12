import { createSlice } from "@reduxjs/toolkit";

export const supplierslice = createSlice({
  name: "suppliers",
  initialState: {
    suppliersData: null,
  },
  reducers: {
    setSuppliersData: (state, action) => {
      state.suppliersData = action.payload;
    },
  },
});

export const { setSuppliersData } = supplierslice.actions;

export default supplierslice.reducer;
