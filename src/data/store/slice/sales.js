import { createSlice } from "@reduxjs/toolkit";

export const salesSlice = createSlice({
  name: "sales",
  initialState: {
    salesData: null,
    posSubtotal: null,
    triggerPOS: null,
    initValue: 0,
  },
  reducers: {
    setSalesData: (state, action) => {
      state.salesData = action.payload;
    },
    setSubTotal: (state, action) => {
      state.posSubtotal = action.payload;
    },
    setTriggerPOS: (state, action) => {
      state.triggerPOS = action.payload;
    },
    setInitValue: (state, action) => {
      state.initValue = action.payload;
    },
  },
});

export const { setSalesData, setTriggerPOS, setInitValue } = salesSlice.actions;

export default salesSlice.reducer;
