import { createSlice } from "@reduxjs/toolkit";

export const posSlice = createSlice({
  name: "pos",
  initialState: {
    posTransData: null,
  },
  reducers: {
    setPOSTransData: (state, action) => {
      state.posTransData = action.payload;
    },
  },
});

export const { setPOSTransData } = posSlice.actions;

export default posSlice.reducer;
