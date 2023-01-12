import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menuData: null,
  },
  reducers: {
    setMenuData: (state, action) => {
      state.menuData = action.payload;
    },
  },
});

export const { setMenuData } = menuSlice.actions;

export default menuSlice.reducer;
