import { createSlice } from "@reduxjs/toolkit";

export const deliverySlice = createSlice({
  name: "delivery",
  initialState: {
    deliveryData: null,
    deliveryAgenciesData: null,
    salesDeliveryData: null,
  },
  reducers: {
    setDeliveryData: (state, action) => {
      state.deliveryData = action.payload;
    },
    setDeliveryAgenciesData: (state, action) => {
      state.deliveryAgenciesData = action.payload;
    },
    setSalesDeliveryData: (state, action) => {
      state.salesDeliveryData = action.payload;
    },
  },
});

export const {
  setDeliveryData,
  setSalesDeliveryData,
  setDeliveryAgenciesData,
} = deliverySlice.actions;

export default deliverySlice.reducer;
