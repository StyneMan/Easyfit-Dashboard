import { createSlice } from "@reduxjs/toolkit";

export const proofSlice = createSlice({
  name: "proofs",
  initialState: {
    proofsData: null,
  },
  reducers: {
    setProofsData: (state, action) => {
      state.proofsData = action.payload;
    },
  },
});

export const { setProofsData } = proofSlice.actions;

export default proofSlice.reducer;
