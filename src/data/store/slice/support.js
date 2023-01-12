import { createSlice } from "@reduxjs/toolkit";

export const supportslice = createSlice({
  name: "supports",
  initialState: {
    supportsData: null,
  },
  reducers: {
    setSupportsData: (state, action) => {
      state.supportsData = action.payload;
    },
  },
});

export const { setSupportsData } = supportslice.actions;

export default supportslice.reducer;
